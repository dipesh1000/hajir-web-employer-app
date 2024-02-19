"use client";
import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const CustomRadioGroup = ({
  name,
  value,
  options,
  onChange,
  setFieldValue,
}) => {
  const handleChange = useCallback(
    (selectedValue) => {
      setFieldValue(name, selectedValue);
    },
    [name, setFieldValue]
  );
  return (
    <RadioGroup row name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <Box
          key={option.value}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "16px",
        
            display: "flex",
          height:'80px',
            alignItems: "center",
            textAlign:'center',
            justifyContent:'center',
backgroundColor:'#C1FFC1',
            paddingRight: "50px",
            // paddingLeft: "50px",
            marginRight: "18px",
            cursor: "pointer",
            flexDirection: "column",
            transition: "background 0.3s, border 0.3s",
            "&:hover": {
              background: "#f5f5f5",
            },
            ...(value === option.value
              ? { background: "#f5f5f5", border: "1px solid #2196F3" }
              : {}),
          }}
          onClick={() => handleChange(option.value)}
        >
          <FormControlLabel
          sx={{width:'180px'}}
            value={option.value}
            control={<Radio sx={{ width: "50%", color: "transparent" }} />}
            label={
              
              <Box
                sx={{
                  display: "flex",
           
                  alignItems: "center",
            
                  color: value === option.value ? "#2196F3" : "#000",
                }}
              >
                {option.label}
              </Box>
            }
          />
          <Typography
            variant="caption"
            sx={{
              marginLeft: "38px",
              color: "#777",
            }}
          >
            {option.description}
          </Typography>
        </Box>
      ))}
    </RadioGroup>
  );
};

export default CustomRadioGroup;
