
"use client"

import React, { useState } from 'react';
import MessageBox from './MessageBox';
import FullMessage from './FullMessage';
import Image from 'next/image';
import Mailsent from './Mailsent.png'; // Import the Mailsent.png image
import attached3 from './attached3.png'
import { useMediaQuery } from '@mui/material';

const Messaging = () => {
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [messageBoxScrollPosition, setMessageBoxScrollPosition] = useState(0); // State to track scroll position
  const isScreenSm = useMediaQuery('(max-width:1255px)'); 
  const isScreenExtraSmall = useMediaQuery('(max-width:950px)'); 

  const handleMessageBoxClick = (message) => {
    setSelectedMessage(message); 
  };

  const handleMessageBoxScroll = (e) => {
    setMessageBoxScrollPosition(e.target.scrollTop);
  };

  const message = {
    img: attached3,
    name: 'John Doe',
    timeAgo: '3 hours ago',
    reason: 'Sick leave',
    message: 'Dear sir, this is me.',
  };

  const messages = Array(27).fill(message);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto', marginRight:'20px' }} onScroll={handleMessageBoxScroll}>
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
      
      <div style={{ flex: '1', width: isScreenSm ? '50%' : '650px' }}>
        {selectedMessage ? (
          <FullMessage
            message={selectedMessage.message}
            name={selectedMessage.name}
            img={selectedMessage.img}
          />
        ) :  (
          isScreenExtraSmall ? null : (
            <Image src={Mailsent} alt="Default" height={700} layout="responsive" style={{ marginTop: '-80px' }} />
          ))
        }
      </div>
    </div>
  );
};
export default Messaging;
