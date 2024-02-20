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

  const [selectedDays, setSelectedDays] = useState([]);
  const [halfDaySelected, setHalfDaySelected] = useState({});

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleHalfDayClick = (day) => {
    setHalfDaySelected((prevSelections) => ({
      ...prevSelections,
      [day]: !prevSelections[day], 
    }));

    if (!halfDaySelected[day]) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
    }
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
              border: selectedDays.includes(day) ? "2px solid red" : "2px solid black",
              borderRadius: "4px",
              padding: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleDayClick(day)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleDayClick(day)}
                sx={{
                  color: selectedDays.includes(day) ? "red" : "black",
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2">{day}</Typography>
            </Box>
            {selectedDays.includes(day) && (
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
