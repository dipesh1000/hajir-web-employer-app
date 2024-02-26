"use client"
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import attached1 from './attached1.png';
import attached2 from './attached2.png';
import attached3 from './attached3.png';

const FullMessage = ({ message, name, img }) => {
  console.log('FullMessage component is rendering');
  const isScreenSmall = useMediaQuery('(max-width:1500px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:900px)');
 
  const buttonWidth = isScreenSmall ? '170px' : '220px'; 

  return (
    <>
      <div style={{ marginTop: '-170px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image src={img} width={70} height={60} />
            <p style={{ marginLeft: '10px' }}>{name}</p>
          </div>
          <div style={{ alignItems: 'center', marginLeft: isScreenSmall ? '120px' : '320px' }}>
            <DeleteIcon style={{ color: 'gray', marginTop: '50px', marginBottom: '-2px' }} />
            <p style={{ marginTop: '-7px' }}>Wed 1/17/2023</p>
          </div>
        </div>
        <div>{message}</div>
        <hr style={{ width: '100%', margin: '0', marginBottom: '30px', marginTop: '20px', borderTop: '1px dotted #ddd' }} />
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-10px' }}>
          <div style={{ flex: 1 }}>
            <div>
              <p>
                Leave <br /> <strong> Sick </strong>
              </p>
            </div>
            <div>
              <p>
                Duration from <br /> <strong>2 Jan 2023</strong>
              </p>
            </div>
            <div>
              <p>
                No. of days <br />
                <strong> 5</strong>
              </p>
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: isExtraSmallScreen ? '20px' : isScreenSmall ? '70px' : '220px' }}> {/* Adjust margin based on screen size */}
            <div>
              <p>
                Type <br /> <strong>Full day</strong>
              </p>
            </div>
            <div>
              <p>
                Duration till <br /> <strong>7 Jan 2023</strong>{' '}
              </p>
            </div>
          </div>
        </div>
        <FormControl style={{ width: '100%' , height:'100px'}}> {/* Adjust height based on laptop height */}
          <Select
            variant="outlined"
            value="Mark as paid leave"
            sx={{
              '& .MuiSelect-icon': {
                color: 'rgb(0, 0, 139)',
              },
            }}>
            <MenuItem value="Mark as paid leave">Mark as paid leave</MenuItem>
            <MenuItem value="Mark as unpaid leave">Mark as unpaid leave</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography style={{ marginTop: '-40px' }}>Attached</Typography>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image src={attached1} width={130} height={80} />
            <Image src={attached2} width={130} height={80} />
            <Image src={attached3} width={130} height={80} />
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'red',
                height: '40px',
                width: buttonWidth,
              }}>
              Rejected
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'green',
                height: '40px',
                width: buttonWidth,
              }}>
              Approved
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullMessage;
