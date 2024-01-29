"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const Step2Component = () => {
  const [salaryType, setSalaryType] = useState("fixed");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [workingHours, setWorkingHours] = useState("08:00");
  const [breakTime, setBreakTime] = useState("00:30"); // Assuming a default break time of 30 minutes

  const handleSalaryTypeChange = (event) => {
    setSalaryType(event.target.value);
    // Reset the text fields when the salary type changes
    setBasicSalary("");
    setAllowance("");
  };

  const handleWorkingHoursChange = (increase) => {
    const [hours, minutes] = workingHours.split(":").map(Number);

    // Increase or decrease by 30 minutes
    const newMinutes = increase ? minutes + 30 : minutes - 30;
    const newHours = newMinutes < 0 ? hours - 1 : hours + 1;

    // Format the new time
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(
      newMinutes < 0 ? 60 + newMinutes : newMinutes
    ).padStart(2, "0");

    setWorkingHours(`${formattedHours}:${formattedMinutes}`);
  };

  const handleBreakTimeChange = (increase) => {
    const [hours, minutes] = breakTime.split(":").map(Number);

    // Increase or decrease by 30 minutes
    const newMinutes = increase ? minutes + 30 : minutes - 30;
    const newHours = newMinutes < 0 ? hours - 1 : hours + 1;

    // Format the new time
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(
      newMinutes < 0 ? 60 + newMinutes : newMinutes
    ).padStart(2, "0");

    setBreakTime(`${formattedHours}:${formattedMinutes}`);
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
            Salary Type <span sx={{ color: "red" }}> *</span>
          </Typography>

          <FormControl fullWidth>
            <Select
              value={salaryType}
              label="Salary Type"
              onChange={handleSalaryTypeChange}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <br />

          <Typography variant="body1">
            Salary <span sx={{ color: "red" }}> *</span>
          </Typography>
          {/* Radio buttons for "fixed" and "breakdown" */}
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="salary-type"
              name="salary-type"
              value={salaryType}
              onChange={handleSalaryTypeChange}
            >
              <FormControlLabel
                value="fixed"
                control={<Radio />}
                label="Fixed"
              />
              <FormControlLabel
                value="breakdown"
                control={<Radio />}
                label="Breakdown"
              />
            </RadioGroup>
          </FormControl>

          {/* Conditional rendering based on the selected salary type */}
          {salaryType === "fixed" ? (
            <TextField
              label="Salary Amount"
              variant="outlined"
              fullWidth
              margin="normal"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
            />
          ) : (
            <>
              <TextField
                label="Basic Salary"
                variant="outlined"
                fullWidth
                margin="normal"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
              />
              <TextField
                label="Allowance"
                variant="outlined"
                fullWidth
                margin="normal"
                value={allowance}
                onChange={(e) => setAllowance(e.target.value)}
              />
            </>
          )}
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
            Working Hours <span sx={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={() => handleWorkingHoursChange(false)}
            >
              -
            </Button>
            <TextField
              label="Working Hours"
              variant="outlined"
              fullWidth
              margin="normal"
              value={workingHours}
              disabled
            />
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={() => handleWorkingHoursChange(true)}
            >
              +
            </Button>
          </div>

          <Typography variant="body1">
            Break Time <span sx={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={() => handleBreakTimeChange(false)}
            >
              -
            </Button>
            <TextField
              label="Break Time"
              variant="outlined"
              fullWidth
              margin="normal"
              value={breakTime}
              disabled
            />
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={() => handleBreakTimeChange(true)}
            >
              +
            </Button>
          </div>

          {/* Additional fields */}
          <TextField
            label="Confirm Phone Number "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step2Component;
