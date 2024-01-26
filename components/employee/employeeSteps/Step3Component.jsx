"use client";

import React, { useState } from "react";
import { Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Step3Component = () => {
  const day = "Sunday"; // Focus on styling and behavior for Sunday
  const [selectedDay, setSelectedDay] = useState(null);
  const [halfDaySelected, setHalfDaySelected] = useState(false);

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
    setHalfDaySelected(false);
  };

  const handleHalfDayClick = (e) => {
    e.stopPropagation();
    setHalfDaySelected(!halfDaySelected);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",

        mt: 2,
        border:
          selectedDay === day ? "2px solid blue" : "2px solid transparent",
        borderRadius: "4px",
        padding: "8px",
        cursor: "pointer",
      }}
      onClick={() => handleDayClick(day)}
    >
      {/* Content for Sunday */}
      <RadioGroup
        row
        name={`day_${day}`}
        value={halfDaySelected ? `halfDay_${day}` : `fullDay_${day}`}
      >
        <FormControlLabel
          value={`fullDay_${day}`}
          control={
            <Radio sx={{ color: selectedDay === day ? "blue" : "black" }} />
          }
          label={day}
        />
        {selectedDay === day && (
          <Box
            sx={{
              ml: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
            onClick={handleHalfDayClick}
          >
            <FormControlLabel
              value={`halfDay_${day}`}
              control={<Radio sx={{ color: "blue" }} />}
              label="Half-day"
              disabled={!selectedDay}
            />
          </Box>
        )}
      </RadioGroup>
    </Box>
  );
};

export default Step3Component;
