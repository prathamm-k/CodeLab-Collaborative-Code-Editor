import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
          console.log(`${username} joined`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        })
      });

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });

      socketRef.current.on(ACTIONS.LEAVE, ({ username }) => {
        toast.success(`${username} has left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.username !== username)
        });
      });

      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.LEAVE);
      };
    };
    init();

    // Handle browser back navigation
    const handleBackNavigation = (event) => {
      event.preventDefault(); // Prevent navigation
      leaveRoom(); // Trigger leaveRoom logic
    };

    window.addEventListener('popstate', handleBackNavigation);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };

  }, []);

  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    }catch(e){
      toast.error('Could not copy room ID, please try again.');
      console.error(e);
    }
  }


  const leaveRoom = () => {
    if (socketRef.current) {
      // Emit a leave event to the server
      socketRef.current.emit(ACTIONS.LEAVE, {
        roomId,
        username: location.state?.username,
      });

      // Display a toast message
      toast.success('You left the room.');

      // Navigate to the home page
      reactNavigator('/');
    }
  }

  if (!location.state){
    return <Navigate to="/" />
  }

  return (
    <div className = 'mainWrapper'>
      <div className = 'sideWrapper'>
        <div className='sideInner'>
          <div className='logo'>
            <img className='logoImage' src ='/codelab.png' alt = 'logo'/>
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            {clients.map((client)=>(
              <Client
                key = {client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <button className='button copyButton' onClick={copyRoomId}>Copy room ID</button>
        <button className='button leaveButton' onClick={leaveRoom}>Leave</button>
      </div>
      <div className='editorWrapper'>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  )
}

export default EditorPage