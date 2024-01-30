import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';

const RadioField = ({ name, formik, label, rest }) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '6px 16px',
        width: '100%',
        display: 'flex',
        // alignItems: "center",
        // flexDirection: "column", // Place items in a column
        transition: 'background 0.3s, border 0.3s',
        '&:hover': {
          background: '#f5f5f5',
        },
        ...(formik.values.holidays === 'Default Government Holidays'
          ? { background: '#f5f5f5', border: '1px solid #2196F3' }
          : {}),
      }}
    >
      <RadioGroup row name={name} onChange={formik.handleChange} {...rest}>
        <FormControlLabel
          value="Default Government Holidays"
          control={<Radio />}
          label={label}
        />
      </RadioGroup>
      {formik.touched.holidays &&
        formik.errors.holidays === 'Default Government Holidays' && (
          <Typography sx={{ color: 'red', marginTop: '4px' }}>
            {formik.errors.holidays}
          </Typography>
        )}
    </Box>
  );
};

export default RadioField;
