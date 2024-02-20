
"use client"

import React, { useState } from 'react';
import MessageBox from './MessageBox';
import FullMessage from './FullMessage';

const Messaging = () => {
  const [selectedMessage, setSelectedMessage] = useState(null); 

  const handleMessageBoxClick = (message) => {
    setSelectedMessage(message); 
  };


  const message = {
    img: 'public/avatar.svg',
    name: 'John Doe',
    timeAgo: '3 hours ago',
    reason: 'Sick leave',
    message: 'Dear sir, this is me.',
  };

  const messages = Array(7).fill(message);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
    
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            img={msg.img}
            name={msg.name}
            timeAgo={msg.timeAgo}
            reason={msg.reason}
            message={msg.message}
            onClick={() => handleMessageBoxClick(msg)}
          />
        ))}
      </div>
      
      {selectedMessage && (
        <div style={{ flex: 1 }}>
          <FullMessage message={selectedMessage.message} name={selectedMessage.name} img={selectedMessage.img} /> 
        </div>
      )}
    </div>
  );
};

export default Messaging;

