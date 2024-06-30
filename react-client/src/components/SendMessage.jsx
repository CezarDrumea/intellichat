import React from 'react';

const SendMessage = ({
  tab,
  message,
  handleMessage,
  sendValue,
  sendPrivateValue,
}) => (
  <form className='send-message' onSubmit={tab === 'CHATROOM' ? sendValue : sendPrivateValue}>
    <input
      type='text'
      className='input-message'
      placeholder='Enter the message'
      value={message}
      onChange={handleMessage}
    />
    <button className='send-button'
    >
      <svg
        height='24'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g fill='white' fillRule='nonzero'>
          <path d='m3.45559904 3.48107721 3.26013002 7.74280879c.20897233.4963093.20897233 1.0559187 0 1.552228l-3.26013002 7.7428088 18.83130296-8.5189228zm-.74951511-1.43663117 20.99999997 9.49999996c.3918881.1772827.3918881.7338253 0 .911108l-20.99999997 9.5c-.41424571.1873968-.8433362-.2305504-.66690162-.6495825l3.75491137-8.9179145c.10448617-.2481546.10448617-.5279594 0-.776114l-3.75491137-8.9179145c-.17643458-.41903214.25265591-.83697933.66690162-.64958246z' />
          <path d='m6 12.5v-1h16.5v1z' />
        </g>
      </svg>
    </button>
  </form>
);

export default SendMessage;
