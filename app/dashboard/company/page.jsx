"use client";

import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Company = () => {
  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    staffCode: yup.string().required("Please select a staff code"),
    dateSelect: yup.string().required("Please select a date"),
    calculationType: yup.string().required("Please select a calculation type"),
    department: yup.string().required("Please enter a department"),
    holidays: yup.string().required("Please enter a holidays"),
    // holidays: yup
    //   .array()
    //   .min(2, "Select at least 2 days")
    //   .max(4, "Select at most 6 days")
    //   .required("Select at least 2 days"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      staffCode: "",
      dateSelect: "",
      calculationType: "",
      department: "",
      // holidays: [],
      holidays: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <Box sx={{ flexGrow: 1, height: "100vh", padding: "10px" }}>
      <Typography variant="h5">Add New Company</Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Name of the company */}
        <TextField
          label="Name of The Company name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        {/* Staff code Selection */}
        <RadioGroup
          row
          name="staffCode"
          value={formik.values.staffCode}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="auto" control={<Radio />} label="Auto" />
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        </RadioGroup>
        {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
          <div className="text-red-500">{formik.errors.staffCode}</div>
        )}

        {/* Date selection */}
        <RadioGroup
          row
          name="dateSelect"
          value={formik.values.dateSelect}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="English"
            control={<Radio />}
            label="English"
          />
          <FormControlLabel value="Nepali" control={<Radio />} label="Nepali" />
        </RadioGroup>
        {formik.touched.dateSelect && Boolean(formik.errors.dateSelect) && (
          <div className="text-red-500">{formik.errors.dateSelect}</div>
        )}

        {/* Salary calculation */}
        <RadioGroup
          row
          name="calculationType"
          value={formik.values.calculationType}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="Calendar Days"
            control={<Radio />}
            label="Calendar Days"
          />
          <FormControlLabel
            value="30 Days"
            control={<Radio />}
            label="30 Days"
          />
        </RadioGroup>
        {formik.touched.calculationType &&
          Boolean(formik.errors.calculationType) && (
            <div className="text-red-500">{formik.errors.calculationType}</div>
          )}

        {/* Create Department */}
        <TextField
          label="Create Department"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("department")}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
        />

        {/* Holidays */}
        <TextField
          label="Holidays"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("holidays")}
          error={formik.touched.holidays && Boolean(formik.errors.holidays)}
          helperText={formik.touched.holidays && formik.errors.holidays}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Company;
