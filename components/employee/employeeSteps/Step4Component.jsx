"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import DatePick from "./DatePick";
import { useFormik } from "formik";
import * as yup from "yup";
const Step4Component = () => {
  const [workingHours, setWorkingHours] = useState("08:00");
  const [overtimeRatio, setOvertimeRatio] = useState(""); // Add this line
  const [allowAccessNetwork, setAllowAccessNetwork] = useState("all"); // Add this line
  const handleAccessNetworkChange = (event) => {
    setAllowAccessNetwork(event.target.value);
  };
  const handleOvertimeRatioChange = (event) => {
    setOvertimeRatio(event.target.value);
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

  const formik = useFormik({
    initialValues: {
      overtimeChecked: 1, // Assuming it's always checked
      sickLeaveChecked: 1, // Assuming it's always checked
      casualLeaveChecked: 1,
      workingHours,
      allowLateAttendanceChecked: 1, // Assuming it's always checked
      overTimeRatioChecked: 1, // Assuming it's always checked
    },
  });

  const validationSchema = yup.object({
    overtimeChecked: yup.number().required("Overtime Hours is required"),
    sickLeaveChecked: yup.number().required("Sick Leave is required"),
    casualLeaveChecked: yup.number().required("Casual Leave is required"),
    workingHours: yup.string().required("Working Hours is required"),
    allowLateAttendanceChecked: yup
      .number()
      .required("Allow Late Attendance is required"),
    overTimeRatioChecked: yup.number().required("Over Time Ratio is required"),

    // Define validation schema for Step 4
  });

  const handleSubmit = () => {
    // Form submission logic here, use checkbox states when needed.
    const formData = {
      overtimeChecked: 1, // Assuming it's always checked
      sickLeaveChecked: 1, // Assuming it's always checked
      casualLeaveChecked: 1,
      workingHours,
      allowLateAttendanceChecked: 1, // Assuming it's always checked
      overTimeRatioChecked: 1, // Assuming it's always checked
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
            mt: 1,
          }}
        >
          <Typography variant="body1">
            Joining Date <span sx={{ color: "red" }}> *</span>
          </Typography>
          <DatePick style={{ marginLeft: "23px" }} />

          {/* Overtime Checkbox Container */}
          <Typography sx={{ marginTop: 2 }} variant="body1">
            Overtime Hours <span sx={{ color: "red" }}>(Optional)</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel control={<Checkbox checked={true} />} />
            <TextField
              sx={{ width: "540px", ml: 2 }}
              label="eg : 2 ,4 ,5 , 6"
            />
          </Box>

          {/* Sick Leave and Casual Leave Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: 2,
              width: "605px", // Full width
            }}
          >
            {/* Sick Leave Container */}
            <Box
              sx={{
                width: "50%", // 50% width
              }}
            >
              <Typography variant="body1">
                Sick Leave <span sx={{ color: "red" }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel control={<Checkbox checked={true} />} />
                <TextField fullWidth label="eg : 2 ,4 ,5 , 6" sx={{ ml: 2 }} />
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
                Casual Leave <span sx={{ color: "red" }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel control={<Checkbox checked={true} />} />
                <TextField fullWidth label="eg : 2 ,4 ,5 , 6" sx={{ ml: 2 }} />
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
            mt: 1,
          }}
        >
          <Typography variant="body1">
            Allow Late Attendance <span sx={{ color: "red" }}>*</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormControlLabel control={<Checkbox checked={true} />} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
          </Box>
          <Typography variant="body1">
            Over Time Ratio <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box>
            <TextField
              label="eg ratio: 2, 4, 5, 6"
              value={overtimeRatio}
              onChange={handleOvertimeRatioChange}
              sx={{ mt: 2, mb: 2 }}
            />
          </Box>
          <Typography variant="body1">
            Allow access Network <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "470px",
              gap: "10px",
              marginTop: 2,
            }}
          >
            <Box
              sx={{
                border: "1px solid #ccc", // Border style
                borderRadius: "5px", // Border radius
                padding: "10px", // Padding
                width: "50%", // 48% width to accommodate the border width
              }}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </Box>
            <Box
              sx={{
                border: "1px solid #ccc", // Border style
                borderRadius: "5px", // Border radius
                padding: "10px", // Padding
                width: "50%", // 48% width to accommodate the border width
              }}
            >
              <FormControlLabel
                value="orCode"
                control={<Radio />}
                label="OR Code"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4Component;
