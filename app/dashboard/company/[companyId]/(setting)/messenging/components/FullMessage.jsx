// FullMessage.js

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';



const FullMessage = ({message, name,img}) => {
    console.log('FullMessage component is rendering');
    const isScreenSmall = useMediaQuery('(max-width:1500px)');

  return (
    <>
    <div  style={{marginTop:'-50px'}}>
    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<Image src={img} width={100} height={100}/>
<p style={{marginLeft:'10px'}}>{name}</p>
</div>
<div style={{ alignItems:'center', marginLeft:'320px'}}>
    <DeleteIcon style={{color:'gray', marginTop:'50px', marginBottom:'-2px'}}/>
    <p style={{marginTop:'-7px'}}>Wed 1/17/2023</p>
</div>

    </div>
    <div>
        {message}
    </div>
    <hr style={{ width: '100%', margin:'0',marginBottom :'30px',marginTop:'20px', borderTop: '1px dotted #ddd' }} />
    <div style={{ display: 'flex', flexDirection: 'row', marginTop:'-10px' }}>
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
  
 
  <div style={{ flex: 1 , marginLeft:'220px'}}>
    <div>
      <p>Type <br/> <strong>Full day</strong></p>
    </div>
    <div>
      <p>Duration till <br/> <strong>7 Jan 2023</strong> </p>
  
    </div>
  </div>
</div>
<FormControl style={{ width: "560px",height:'100px' }}>
            <Select
         
              variant="outlined"
              value="Mark as paid leave"
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
              
              }}
            >
              <MenuItem value="Mark as paid leave">Mark as paid leave</MenuItem>
              <MenuItem value="Mark as unpaid leave">Mark as unpaid leave</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Typography style={{marginTop:'-40px'}}>Attached</Typography>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Image src="" width={130} height={80}/>
                <Image src="" width={130} height={80}/>
                <Image src="" width={130} height={80}/>
            </div>
            <div style={{marginTop:'20px'}}>
            <Button variant="contained" sx={{backgroundColor:"red", marginRight:isScreenSmall? '160px':'70px', width: isScreenSmall? '190px':'260px'}} >Rejected</Button>
            <Button variant="contained" sx={{backgroundColor:'green', width: isScreenSmall? '190px':'260px'}}>Approved</Button>
            </div>
          </div>
</div>
    </>
  );

};

export default FullMessage;
