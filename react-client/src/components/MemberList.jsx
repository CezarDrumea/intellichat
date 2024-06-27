import React from 'react';

const MemberList = ({ tab, setTab, privateChats, currentUser }) => (
  <div className="member-list">
    <ul>
      <li
        onClick={() => setTab('CHATROOM')}
        className={`member ${tab === 'CHATROOM' ? 'active' : ''}`}
      >
        Chatroom
      </li>
      {[...privateChats.keys()].filter(name => name !== currentUser).map((name, index) => (
        <li
          onClick={() => setTab(name)}
          className={`member ${tab === name ? 'active' : ''}`}
          key={index}
        >
          {name}
        </li>
      ))}
    </ul>
  </div>
);

export default MemberList;
