import { Button } from '@mui/material';
import React from 'react';

const CustomButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        width: '250px',
        height: '50px',
      }}
    >
      Create
    </Button>
  );
};

export default CustomButton;
