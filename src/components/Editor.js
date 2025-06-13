import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: 'python',
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue' && socketRef.current) {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });

      // Add keyboard shortcuts for running and downloading code
      editorRef.current.on('keydown', (editor, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          const code = editor.getValue();
          socketRef.current.emit(ACTIONS.RUN_CODE, {
            roomId,
            code,
          });
        } else if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault();
          downloadCode();
        }
      });
    }
    init();
  }, [roomId, socketRef, onCodeChange]);

  useEffect(() => {
    const socket = socketRef.current;
    if (socket) {
      socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
      socket.on(ACTIONS.CODE_OUTPUT, ({ output }) => {
        setOutput(output);
      });
    }
    return () => {
      if (socket) {
        socket.off(ACTIONS.CODE_CHANGE);
        socket.off(ACTIONS.CODE_OUTPUT);
      }
    };
  });

  const runCode = () => {
    const code = editorRef.current.getValue();
    socketRef.current.emit(ACTIONS.RUN_CODE, {
      roomId,
      code,
    });
  };

  const downloadCode = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button onClick={runCode} className="button runButton" data-tooltip="Ctrl+Enter">
          ▶ Run
        </button>
        <button onClick={downloadCode} className="button downloadButton" data-tooltip="Ctrl+S">
          ↓ Download
        </button>
      </div>
      <div className="editor-main">
        <div className="editor-wrapper">
          <textarea id="realtimeEditor"></textarea>
        </div>
        <div className="output">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Editor;