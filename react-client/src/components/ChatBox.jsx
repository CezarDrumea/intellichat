import React from 'react';
import MemberList from './MemberList';
import ChatMessages from './ChatMessages';
import SendMessage from './SendMessage';

const ChatBox = ({
  tab,
  setTab,
  userData,
  publicChats,
  privateChats,
  handleMessage,
  sendValue,
  sendPrivateValue,
}) => (
  <div className="chat-box">
    <MemberList
      tab={tab}
      setTab={setTab}
      privateChats={privateChats}
      currentUser={userData.username}
    />
    <div className="chat-content">
      <ChatMessages
        tab={tab}
        userData={userData}
        publicChats={publicChats}
        privateChats={privateChats}
      />
      <SendMessage
        tab={tab}
        message={userData.message}
        handleMessage={handleMessage}
        sendValue={sendValue}
        sendPrivateValue={sendPrivateValue}
      />
    </div>
  </div>
);

export default ChatBox;
