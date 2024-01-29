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
  const [overtimeVisible, setOvertimeVisible] = useState(true);
  const [sickLeaveVisible, setSickLeaveVisible] = useState(true);
  const [casualLeaveVisible, setCasualLeaveVisible] = useState(true);
  const [workingHours, setWorkingHours] = useState("08:00");
  const [allowLateAttendanceVisible, setAllowLateAttendanceVisible] =
    useState(true);
  const [overTimeRatioVisible, setOverTimeRatioVisible] = useState(true);

  const handleOvertimeChange = () => {
    setOvertimeVisible(!overtimeVisible);
  };

  const handleSickLeaveChange = () => {
    setSickLeaveVisible(!sickLeaveVisible);
  };

  const handleCasualLeaveChange = () => {
    setCasualLeaveVisible(!casualLeaveVisible);
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
    setAllowLateAttendanceVisible(!allowLateAttendanceVisible);
  };

  const handleOverTimeRatioChange = () => {
    setOverTimeRatioVisible(!overTimeRatioVisible);
  };

  const handleSubmit = () => {
    // Form submission logic here, use checkbox states when needed.
    const formData = {
      overtimeChecked: overtimeVisible ? 1 : 0,
      sickLeaveChecked: sickLeaveVisible ? 1 : 0,
      casualLeaveChecked: casualLeaveVisible ? 1 : 0,
      workingHours,
      allowLateAttendanceChecked: allowLateAttendanceVisible ? 1 : 0,
      overTimeRatioChecked: overTimeRatioVisible ? 1 : 0,
    };

    // Do something with formData, like submitting to a server or updating state.
    console.log(formData);
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
          <DatePick style={{}} />

          {/* Overtime Checkbox Container */}
          <Typography variant="body1">
            Overtime Hours{" "}
            <span sx={{ color: "red" }}>
              {overtimeVisible ? " (Optional)" : " *"}
            </span>
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
                  checked={overtimeVisible}
                  onChange={handleOvertimeChange}
                />
              }
            />
            {overtimeVisible && (
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
                      checked={sickLeaveVisible}
                      onChange={handleSickLeaveChange}
                    />
                  }
                />
                {sickLeaveVisible && (
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
                      checked={casualLeaveVisible}
                      onChange={handleCasualLeaveChange}
                    />
                  }
                />
                {casualLeaveVisible && (
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
            Allow Late Attendance{" "}
            <span sx={{ color: "red" }}>
              {allowLateAttendanceVisible ? " (Optional)" : " *"}
            </span>
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
                  checked={allowLateAttendanceVisible}
                  onChange={handleAllowLateAttendanceChange}
                />
              }
            />
            {allowLateAttendanceVisible && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{ marginRight: 2 }}
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
                  sx={{ marginLeft: 2 }}
                  variant="outlined"
                  onClick={() => handleWorkingHoursChange(true)}
                >
                  +
                </Button>
              </div>
            )}
          </Box>

          <Typography variant="body1">
            Over Time Ratio{" "}
            <span sx={{ color: "red" }}>
              {overTimeRatioVisible ? " (Optional)" : " *"}
            </span>
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
                  checked={overTimeRatioVisible}
                  onChange={handleOverTimeRatioChange}
                />
              }
            />
            {overTimeRatioVisible && (
              <TextField
                fullWidth
                label="eg ratio : 2, 4, 5, 6"
                sx={{ ml: 2 }}
              />
            )}
          </Box>

          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4Component;
