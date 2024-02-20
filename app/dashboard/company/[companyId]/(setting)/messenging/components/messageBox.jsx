// messaging/components/MessageBox.js
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const MessageBox = ({ img,name, timeAgo, reason, message , onClick}) => {
    
  return (
   <>
    <div style={{ display: 'flex', alignItems: 'center', overflow:'auto'}} onClick={onClick} >
 
    {img && (
      <div>
        <Image src={img} alt="User" width={50} height={50} />
      </div>
    )}

   
    <div style={{ flex: '1', marginLeft: '10px' }}>
        <p style={{ margin: '0', marginBottom: '2px' }}>{name}  </p>
        <span style={{ margin: '0', marginBottom: '2px' }}> <strong>{reason} </strong> <span style={{marginLeft:'70px'}}>{timeAgo}</span></span>
        <p style={{ margin: '0', color:'gray' }}>{message}</p>
      </div>

 
   

  </div>
    <hr style={{ width: '43%', margin:'0',marginBottom :'30px', borderTop: '1px dotted #ddd' }} />
  

    </>
  );
};


  
  export default MessageBox;
  
