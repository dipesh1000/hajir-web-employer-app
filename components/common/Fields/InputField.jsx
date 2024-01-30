import { Box, FormHelperText, OutlinedInput, TextField } from '@mui/material';
import React from 'react';

const InputField = (props) => {
  const { helperText, ...rest } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        id="outlined-basic"
        fullWidth
        label="Outlined"
        variant="outlined"
        {...rest}
      />
    </Box>
  );
};

export default InputField;
