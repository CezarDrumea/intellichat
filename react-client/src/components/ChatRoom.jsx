import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import UserRegistration from './UserRegistration';
import ChatBox from './ChatBox';

const HOST = '192.168.0.2';

let stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS(`http://${HOST}:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData((prevUserData) => ({ ...prevUserData, connected: true }));
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    };
    stompClient.send('/app/join', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.has(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        setPublicChats((prevPublicChats) => [...prevPublicChats, payloadData]);
        break;
      default:
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const list = [payloadData];
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.error(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, message: value }));
  };

  const sendValue = (e) => {
    e.preventDefault();
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData((prevUserData) => ({ ...prevUserData, message: '' }));
    }
  };

  const sendPrivateValue = (e) => {
    e.preventDefault();
    if (stompClient && tab !== userData.username) {
      const chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (privateChats.has(tab)) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData((prevUserData) => ({ ...prevUserData, message: '' }));
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, username: value }));
  };

  const registerUser = (e) => {
    e.preventDefault();
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <ChatBox
          tab={tab}
          setTab={setTab}
          userData={userData}
          publicChats={publicChats}
          privateChats={privateChats}
          handleMessage={handleMessage}
          sendValue={sendValue}
          sendPrivateValue={sendPrivateValue}
        />
      ) : (
        <UserRegistration
          username={userData.username}
          handleUsername={handleUsername}
          registerUser={registerUser}
        />
      )}
    </div>
  );
};

export default ChatRoom;
