// messaging/page.jsx
import React from 'react';
import Messaging from './components/messaging';
import { Typography } from '@mui/material';

const MessagingPage = () => {
  return (
    <div>
        <Typography style={{marginBottom:'30px'}}>Messages</Typography>
      <Messaging style={{marginBottom:'10px'}} />
    </div>
  );
};

export default MessagingPage;
