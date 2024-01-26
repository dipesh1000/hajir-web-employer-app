"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DatePick from "./DatePick";

const Step4Component = () => {
  const [overtimeChecked, setOvertimeChecked] = useState(false);
  const [sickLeaveChecked, setSickLeaveChecked] = useState(false);
  const [casualLeaveChecked, setCasualLeaveChecked] = useState(false);
  const [workingHours, setWorkingHours] = useState("08:00");
  const [allowLateAttendance, setAllowLateAttendance] = useState(false);
  const [overTimeRatioChecked, setOverTimeRatioChecked] = useState(false);

  const handleOvertimeChange = () => {
    setOvertimeChecked(!overtimeChecked);
  };

  const handleSickLeaveChange = () => {
    setSickLeaveChecked(!sickLeaveChecked);
  };

  const handleCasualLeaveChange = () => {
    setCasualLeaveChecked(!casualLeaveChecked);
  };

  const handleWorkingHoursChange = (increase) => {
    const [hours, minutes] = workingHours.split(":").map(Number);
    const newMinutes = increase ? minutes + 30 : minutes - 30;
    const newHours = newMinutes < 0 ? hours - 1 : hours + 1;
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(
      newMinutes < 0 ? 60 + newMinutes : newMinutes
    ).padStart(2, "0");
    setWorkingHours(`${formattedHours}:${formattedMinutes}`);
  };

  const handleAllowLateAttendanceChange = () => {
    setAllowLateAttendance(!allowLateAttendance);
  };

  const handleOverTimeRatioChange = () => {
    setOverTimeRatioChecked(!overTimeRatioChecked);
  };

  return (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 2,
          }}
        >
          <Typography variant="body1">
            Joining Date <span sx={{ color: "red" }}> *</span>
          </Typography>
          <DatePick />
          {/* Overtime Checkbox Container */}
          <Typography variant="body1">
            Overtime Hours <span sx={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={overtimeChecked}
                  onChange={handleOvertimeChange}
                />
              }
            />
            {overtimeChecked && (
              <TextField fullWidth label="eg : 2 ,4 ,5 , 6" sx={{ ml: 2 }} />
            )}
          </Box>

          {/* Sick Leave and Casual Leave Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%", // Full width
            }}
          >
            {/* Sick Leave Container */}
            <Box
              sx={{
                width: "50%", // 50% width
              }}
            >
              <Typography variant="body1">
                Sick Leave <span sx={{ color: "red" }}> *</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sickLeaveChecked}
                      onChange={handleSickLeaveChange}
                    />
                  }
                />
                {sickLeaveChecked && (
                  <TextField
                    fullWidth
                    label="eg : 2 ,4 ,5 , 6"
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
            </Box>

            {/* Casual Leave Container */}
            <Box
              sx={{
                width: "50%", // 50% width
                ml: 2, // Left margin
              }}
            >
              <Typography variant="body1">
                Casual Leave <span sx={{ color: "red" }}> *</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={casualLeaveChecked}
                      onChange={handleCasualLeaveChange}
                    />
                  }
                />
                {casualLeaveChecked && (
                  <TextField
                    fullWidth
                    label="eg : 2 ,4 ,5 , 6"
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 2,
          }}
        >
          <Typography variant="body1">
            Allow Late Attendance <span sx={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowLateAttendance}
                  onChange={handleAllowLateAttendanceChange}
                />
              }
            />
            {allowLateAttendance && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleWorkingHoursChange(false)}
                >
                  -
                </Button>
                <TextField
                  label="Allow late attendance"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={workingHours}
                  disabled
                />
                <Button
                  variant="outlined"
                  onClick={() => handleWorkingHoursChange(true)}
                >
                  +
                </Button>
              </div>
            )}
          </Box>
          <Typography variant="body1">
            Over Time Ratio <span sx={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={overTimeRatioChecked}
                  onChange={handleOverTimeRatioChange}
                />
              }
            />
            {overTimeRatioChecked && (
              <TextField
                fullWidth
                label="eg ratio : 2, 4, 5, 6"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4Component;
