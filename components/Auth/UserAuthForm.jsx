"use client";
import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

const UserAuthForm = ({ onSubmit, formik, className, ...props }) => {
  // Use the useFormik hook to get the formik context
  formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: (values) => {
      // Your form submission logic here
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Grid container spacing={2} className={className} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="phone"
            label="Phone Number"
            placeholder="+977 9841234567"
            name="phone"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {/* <Button type="submit" variant="contained" color="primary">
            Login
          </Button> */}
        </Grid>
      </form>
    </Grid>
  );
};

export default UserAuthForm;
