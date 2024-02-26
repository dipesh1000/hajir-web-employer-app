// messaging/page.jsx
import React from 'react';
import Messaging from './components/messaging';
import { Typography } from '@mui/material';
import Searchh from './components/Searchh';

const MessagingPage = () => {
  return (
    <div>
      <div>
        <span style={{fontWeight:'500', fontSize:'28px'}}>Message Inbox</span>
        <div style={{display:'flex',fontWeight:'200', flexDirection:'row', fontSize:'20px', marginTop:'-20px', color:'gray'}}>
          <p style={{fontWeight:'200', marginRight:'10px'}}>Home</p>
       <p style={{fontWeight:'200', marginRight:'10px'}}>Setting</p>
       <p style={{fontWeight:'200'}}>Message</p>
        </div>
      </div>
    <Searchh />
        <Typography style={{marginBottom:'30px', marginTop:'20px', fontWeight:'500'}}>Messages</Typography>
      <Messaging style={{marginBottom:'10px'}} />
    </div>
  );
};

export default MessagingPage;
