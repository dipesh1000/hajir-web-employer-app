// FullMessage.js
import { Image } from '@mui/icons-material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const FullMessage = ({message, name,img}) => {
    console.log('FullMessage component is rendering');
  return (
    <>
    <div style={{marginLeft:'-230px'}}>
    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image src={img} width={100} height={100}/>
<p style={{marginLeft:'10px'}}>{name}</p>
</div>
<div style={{marginLeft:'100px', alignItems:'center', marginLeft:'520px'}}>
    <DeleteIcon style={{color:'gray', marginTop:'50px', marginBottom:'-2px'}}/>
    <p style={{marginTop:'-7px'}}>Wed 1/17/2023</p>
</div>

    </div>
    <div>
        {message}
    </div>
    <hr style={{ width: '100%', margin:'0',marginBottom :'30px',marginTop:'20px', borderTop: '1px dotted #ddd' }} />
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  {/* First column */}
  <div style={{ flex: 1 }}>
    <div>
      <p>Leave <br/> <strong> Sick </strong></p>
    </div>
    <div>
      <p>Duration from <br/> <strong>2 Jan 2023</strong></p>
     
    </div>
    <div>
      <p>No. of days <br/><strong> 5</strong></p>
    
    </div>
  </div>
  
 
  <div style={{ flex: 1 , marginLeft:'360px'}}>
    <div>
      <p>Type <br/> <strong>Full day</strong></p>
    </div>
    <div>
      <p>Duration till <br/> <strong>7 Jan 2023</strong> </p>
  
    </div>
  </div>
</div>
</div>
    </>
  );
};

export default FullMessage;
