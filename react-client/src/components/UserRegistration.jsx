import React from 'react';

const UserRegistration = ({ username, handleUsername, registerUser }) => (
  <form className="register" onSubmit={registerUser}>
    <input
      id="user-name"
      placeholder="Enter your name"
      name="userName"
      value={username}
      onChange={handleUsername}
      margin="normal"
      className="input-register"
    />
    <button type="button" className="register-button">
      connect
    </button>
  </form>
);

export default UserRegistration;
