"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as yup from "yup";
import { useFormik } from "formik";

const Step1Component = () => {
  const validationSchema = yup.object({
    code: yup
      .string()
      .required("Staff Code is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    name_holder: yup.string().required("name_holder is required"),
    contact: yup.string().required("Mobile Number is required"),
    designation: yup.string().required("Designation is required"),
    marriage_status: yup.string().required("Marriage Status is required"),
    name: yup.string().required("Full Name is required"),
    confirmPhoneNumber: yup
      .string()
      .required("Confirm Phone Number is required")
      .oneOf([yup.ref("contact"), null], "Phone Numbers must match"),
    departments: yup.string().required("departments is required"),
  });

  const [name_holder, setname_holder] = useState("Mr");
  const [marriage_status, setmarriage_status] = useState("Married");
  const [departments, setdepartments] = useState("");

  const handleChangename_holder = (event) => {
    setname_holder(event.target.value);
  };

  const handleChangemarriage_status = (event) => {
    setmarriage_status(event.target.value);
  };

  const handleChangedepartments = (event) => {
    setdepartments(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      name_holder: "Mr",
      contact: "",
      designation: "",
      marriage_status: "Married",
      name: "",
      confirmPhoneNumber: "",
      departments: "",
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
          {/* Staff code  */}
          <div>
            Staff Code <span sx={{ color: "red" }}> *</span>
          </div>
          <TextField
            label="Staff Code"
            variant="outlined"
            sx={{ width: "700px" }}
            margin="normal"
            name="code"
            {...formik.getFieldProps("code")}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />

          <br />

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <FormControl>
              <InputLabel htmlFor="demo-simple-select-label">
                name_holder <span style={{ color: "red" }}> *</span>
              </InputLabel>{" "}
              <Select
                value={formik.values.name_holder}
                label="name_holder"
                onChange={formik.handleChange}
                name="name_holder"
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Full Name"
              variant="outlined"
              sx={{ marginLeft: 3, width: "610px", marginTop: 0.1 }}
              margin="normal"
              name="name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>

          <br />
          <TextField
            label="Phone Number "
            variant="outlined"
            sx={{ width: "700px", marginTop: 0.1 }}
            margin="normal"
            name="contact"
            {...formik.getFieldProps("contact")}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
          />
          <br />

          <TextField
            label="Designation "
            variant="outlined"
            sx={{ width: "700px", marginTop: 0.1 }}
            margin="normal"
            name="designation"
            {...formik.getFieldProps("designation")}
            error={
              formik.touched.designation && Boolean(formik.errors.designation)
            }
            helperText={formik.touched.designation && formik.errors.designation}
          />
          <br />
          <FormControl sx={{ width: "700px", marginTop: 0.1 }}>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Marriage Status <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select
              value={formik.values.marriage_status}
              label="Marriage Status"
              onChange={formik.handleChange}
              name="marriage_status"
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
            mt: 20,
          }}
        >
          {/* Full Name */}

          {/* Confirm Phone Number */}
          <TextField
            label="Confirm Phone Number "
            variant="outlined"
            FormControl
            sx={{ width: "700px", marginTop: 8.4 }}
            margin="normal"
            name="confirmPhoneNumber"
            {...formik.getFieldProps("confirmPhoneNumber")}
            error={
              formik.touched.confirmPhoneNumber &&
              Boolean(formik.errors.confirmPhoneNumber)
            }
            helperText={
              formik.touched.confirmPhoneNumber &&
              formik.errors.confirmPhoneNumber
            }
          />
          <FormControl sx={{ width: "700px", marginTop: 2.8 }}>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              departments <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select
              value={formik.values.departments}
              label="departments"
              onChange={formik.handleChange}
              name="departments"
            >
              <MenuItem value="IT departments">IT departments</MenuItem>
              <MenuItem value="Finance departments">
                Finance departments
              </MenuItem>
              <MenuItem value="Customer Support departments">
                Customer Support departments
              </MenuItem>
              <MenuItem value="Business departments">
                Business departments
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1Component;
