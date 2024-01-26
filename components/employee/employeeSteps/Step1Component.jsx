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
import Link from "next/link";

const Step1Component = () => {
  const [title, setTitle] = useState("Mr");
  const [marriageStatus, setMarriageStatus] = useState("Married");
  const [department, setDepartment] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeMarriageStatus = (event) => {
    setMarriageStatus(event.target.value);
  };
  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
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
          {/* Staff code  */}
          <Typography variant="body1">
            Staff Code <span sx={{ color: "red" }}> *</span>
          </Typography>
          <TextField
            label="Staff Code "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
          <br />

          {/* Candidate Title mr and mrs  */}

          <FormControl fullWidth>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Title <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select value={title} label="Title" onChange={handleChangeTitle}>
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Mobile Number "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
          <TextField
            label="Designation "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
          <br />
          <FormControl fullWidth>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Marriage Status <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select
              value={marriageStatus}
              label="Marriage Status"
              onChange={handleChangeMarriageStatus}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 16,
          }}
        >
          <TextField
            label="Full Name "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
          <TextField
            label="Confirm Phone Number "
            variant="outlined"
            fullWidth
            margin="normal"
            // Add any props as needed
          />
          <FormControl fullWidth>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Department <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select
              value={department}
              label="Department"
              onChange={handleChangeDepartment}
            >
              <MenuItem value="IT Department">IT Department</MenuItem>
              <MenuItem value="Finance Department">Finance Department</MenuItem>
              <MenuItem value="Customer Support Department">
                Customer Support Department
              </MenuItem>
              <MenuItem value="Business Department">
                Business Department
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1Component;
