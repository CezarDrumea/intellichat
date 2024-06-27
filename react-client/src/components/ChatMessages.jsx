import React from 'react';

const ChatMessages = ({ tab, userData, publicChats, privateChats }) => (
  <div className="chat-messages">
    {tab === 'CHATROOM' &&
      publicChats.map((chat, index) => (
        <div
          className={`message ${chat.senderName === userData.username ? 'self' : ''}`}
          key={index}
        >
          {chat.senderName !== userData.username && (
            <div className="avatar">
              {chat.senderName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="message-data">
            <strong>{chat.senderName}</strong>: {chat.message}
          </div>
          {chat.senderName === userData.username && (
            <div className="avatar self">
              {chat.senderName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ))}
    {tab !== 'CHATROOM' &&
      privateChats.get(tab)?.map((chat, index) => (
        <div
          className={`message ${chat.senderName === userData.username ? 'self' : ''}`}
          key={index}
        >
          {chat.senderName !== userData.username && (
            <div className="avatar">
              {chat.senderName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="message-data">
            <strong>{chat.senderName}</strong>: {chat.message}
          </div>
          {chat.senderName === userData.username && (
            <div className="avatar self">
              {chat.senderName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ))}
  </div>
);

export default ChatMessages;
