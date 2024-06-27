import React from 'react';

const UserRegistration = ({ username, handleUsername, registerUser }) => (
  <div className="register">
    <input
      id="user-name"
      placeholder="Enter your name"
      name="userName"
      value={username}
      onChange={handleUsername}
      margin="normal"
      className="input-register"
    />
    <button type="button" className="register-button" onClick={registerUser}>
      connect
    </button>
  </div>
);

export default UserRegistration;
