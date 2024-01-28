"use client";

import React, { useState } from "react";
import { Box, Checkbox, Grid, Typography } from "@mui/material";

const Step3Component = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [expandedDay, setExpandedDay] = useState(null);
  const [halfDaySelected, setHalfDaySelected] = useState({});

  const handleDayClick = (day) => {
    setExpandedDay(day);
    setHalfDaySelected((prevSelections) => ({
      ...prevSelections,
      [day]: prevSelections[day] || false,
    }));
  };

  const handleHalfDayClick = (day) => {
    setHalfDaySelected((prevSelections) => ({
      ...prevSelections,
      [day]: !prevSelections[day],
    }));
  };

  return (
    <Grid container spacing={2}>
      {days.map((day) => (
        <Grid item xs={4} key={day}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              border: expandedDay === day ? "2px solid red" : "2px solid black",
              borderRadius: "4px",
              padding: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleDayClick(day)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={expandedDay === day}
                sx={{
                  color: expandedDay === day ? "red" : "black",
                }}
              />
              <Typography variant="body2">{day}</Typography>
            </Box>
            {expandedDay === day && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={halfDaySelected[day]}
                  sx={{ color: "red" }}
                  onChange={() => handleHalfDayClick(day)}
                />
                <Typography variant="body2">Half Day?</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Step3Component;
