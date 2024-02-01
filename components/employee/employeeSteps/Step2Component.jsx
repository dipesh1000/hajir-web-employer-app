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
import * as yup from "yup";
import { useFormik } from "formik";

const Step2Component = () => {
  const [salaryType, setSalaryType] = useState("fixed");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [workingHours, setWorkingHours] = useState("08:00");
  const [breakTime, setBreakTime] = useState("00:30");
  const [dutyTime, setDutyTime] = useState("08:00");
  const [probationPeriod, setProbationPeriod] = useState("3");
  const [ampm, setAmpm] = useState("Am");
  const handleSalaryTypeChange = (event) => {
    setSalaryType(event.target.value);
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

  // Form validation schema using Yup
  const validationSchema = yup.object({
    // salaryType: yup.string().required("Salary Type is required"),
    basicSalary: yup.string().required("Basic Salary is required"),
    allowance: yup.string().required("Allowance is required"),
    salaryAmount: yup.string().required("Salary AMount is required"),
  });
  //here is the old validation

  const formik = useFormik({
    initialValues: {
      salaryType: "fixed",
      basicSalary: "",
      allowance: "",
      salaryAmount: "",
      workingHours: "08:00",
      dutyTime: "08:00",
      breakTime: "00:30",
      probationPeriod: "3",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

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
            Salary Type <span sx={{ color: "red" }}> *</span>
          </Typography>

          <FormControl sx={{ width: "700px", marginTop: 2 }}>
            <InputLabel
              htmlFor="salary-type"
              sx={{ color: "black", marginBottom: 0 }}
            >
              Salary Type
            </InputLabel>
            <Select
              value={formik.values.salaryType}
              label="Salary Type"
              name="salaryType"
              onChange={(e) => {
                formik.handleChange(e);
                handleSalaryTypeChange(e);
              }}
              id="salary-type"
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ marginTop: 2 }} variant="body1">
            Salary <span sx={{ color: "red" }}> *</span>
          </Typography>
          {/* Radio buttons for "fixed" and "breakdown" */}
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="salary-type"
              sx={{ width: "700px", marginTop: 1 }}
              name="salaryType"
              value={formik.values.salaryType}
              onChange={(e) => {
                formik.handleChange(e);
                handleSalaryTypeChange(e);
              }}
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

          {formik.values.salaryType === "fixed" ? (
            <TextField
              label="Salary Amount"
              variant="outlined"
              margin="normal"
              sx={{ width: "700px" }}
              name="basicSalary"
              {...formik.getFieldProps("salaryAmount")}
              error={
                formik.touched.salaryAmount &&
                Boolean(formik.errors.salaryAmount)
              }
              helperText={
                formik.touched.salaryAmount && formik.errors.salaryAmount
              }
            />
          ) : (
            <>
              <TextField
                label="Basic Salary"
                variant="outlined"
                sx={{ width: "700px" }}
                margin="normal"
                name="basicSalary"
                {...formik.getFieldProps("basicSalary")}
                error={
                  formik.touched.basicSalary &&
                  Boolean(formik.errors.basicSalary)
                }
                helperText={
                  formik.touched.basicSalary && formik.errors.basicSalary
                }
              />
              <TextField
                label="Allowance"
                variant="outlined"
                sx={{ width: "700px" }}
                margin="normal"
                name="allowance"
                {...formik.getFieldProps("allowance")}
                error={
                  formik.touched.allowance && Boolean(formik.errors.allowance)
                }
                helperText={formik.touched.allowance && formik.errors.allowance}
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
            mt: 1,
          }}
        >
          <Typography variant="body1">
            Working Hours <span sx={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => handleWorkingHoursChange(false)}
            >
              -
            </Button>
            <TextField
              label="Working Hours"
              variant="outlined"
              sx={{
                width: "333px",
                textAlign: "center",
              }}
              margin="normal"
              name="workingHours"
              inputProps={{ style: { textAlign: "center" } }}
              {...formik.getFieldProps("workingHours")}
            />
            <Button
              variant="outlined"
              onClick={() => handleWorkingHoursChange(true)}
            >
              +
            </Button>
          </div>

          <Typography variant="body1">
            Duty Time <span sx={{ color: "red" }}> *</span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TextField
              label="Duty Time"
              variant="outlined"
              margin="normal"
              name="dutyTime"
              {...formik.getFieldProps("dutyTime")}
              sx={{
                width: "375px",
                textAlign: "center",
              }}
            />
            <FormControl sx={{ width: "95px", marginTop: 1 }}>
              <InputLabel htmlFor="am">AM/PM</InputLabel>
              <Select
                value={formik.values.ampm}
                label="AM/PM<"
                onChange={(e) => formik.handleChange(e)}
                name="ampm"
              >
                <MenuItem value="am">Am</MenuItem>
                <MenuItem value="Pm">Pm</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body1">
            Break Time <span sx={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => handleBreakTimeChange(false)}
            >
              -
            </Button>
            <TextField
              label="Break Time"
              variant="outlined"
              sx={{
                width: "333px",
                textAlign: "center",
              }}
              margin="normal"
              name="breakTime"
              inputProps={{ style: { textAlign: "center" } }}
              {...formik.getFieldProps("breakTime")}
            />
            <Button
              variant="outlined"
              onClick={() => handleBreakTimeChange(true)}
            >
              +
            </Button>
          </div>

          <Typography variant="body1">
            Probation Period <span sx={{ color: "red" }}> *</span>
          </Typography>

          <FormControl sx={{ width: "482px" }}>
            <Select
              value={formik.values.probationPeriod}
              label="Probation Period "
              onChange={(e) => {
                formik.handleChange(e);
                handleSalaryTypeChange(e);
              }}
              name="probationPeriod"
            >
              <MenuItem value="1 month">1 month</MenuItem>
              <MenuItem value="3 month">3 month</MenuItem>
              <MenuItem value="6 month">6 month</MenuItem>
              <MenuItem value="12 month ">12 month</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step2Component;
