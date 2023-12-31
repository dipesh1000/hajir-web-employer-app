import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const DatePicker = ({ title, placeholder, onDelete, dateFormat }) => {
  const [dates, setDates] = useState([]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDates([...dates, selectedDate]);
  };

  const handleChipRemove = (index) => {
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
    onDelete && onDelete(newDates); // Notify the parent component about the change
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="300px"
      // mx="auto"
      mt="20px"
    >
      <h3>{title}</h3>
      <TextField
        type="date"
        onChange={handleDateChange}
        placeholder={placeholder}
        sx={{ width: "100%", marginBottom: "10px", fontSize: "10px" }}
      />
      <div>
        {dates.map((date, index) => (
          <Chip
            key={index}
            label={dateFormat ? dateFormat(date) : date}
            onDelete={() => handleChipRemove(index)}
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              margin: "0.5em",
              fontSize: "10px",
            }}
          />
        ))}
      </div>
    </Box>
  );
};

export default DatePicker;
