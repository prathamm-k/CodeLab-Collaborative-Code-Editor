import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('New room created');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('Requires room id and username');
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src="/codelab.png" alt="codelab-logo" />
        <h4 className="mainLabel">Paste invitation Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleEnter}
          />
          <button onClick={joinRoom} className="button joinButton">
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create a{' '}
            <button onClick={createNewRoom} className="createNewRoom">
              new room
            </button>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built by Pratham</h4>
      </footer>
    </div>
  );
};

export default Home;