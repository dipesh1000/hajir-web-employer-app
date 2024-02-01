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
    staffCode: yup
      .string()
      .required("Staff Code is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    title: yup.string().required("Title is required"),
    mobileNumber: yup.string().required("Mobile Number is required"),
    designation: yup.string().required("Designation is required"),
    marriageStatus: yup.string().required("Marriage Status is required"),
    fullName: yup.string().required("Full Name is required"),
    confirmPhoneNumber: yup
      .string()
      .required("Confirm Phone Number is required")
      .oneOf([yup.ref("mobileNumber"), null], "Phone Numbers must match"),
    department: yup.string().required("Department is required"),
  });

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

  const formik = useFormik({
    initialValues: {
      staffCode: "",
      title: "Mr",
      mobileNumber: "",
      designation: "",
      marriageStatus: "Married",
      fullName: "",
      confirmPhoneNumber: "",
      department: "",
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
            name="staffCode"
            {...formik.getFieldProps("staffCode")}
            error={formik.touched.staffCode && Boolean(formik.errors.staffCode)}
            helperText={formik.touched.staffCode && formik.errors.staffCode}
          />

          <br />

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <FormControl>
              <InputLabel htmlFor="demo-simple-select-label">
                Title <span style={{ color: "red" }}> *</span>
              </InputLabel>{" "}
              <Select
                value={formik.values.title}
                label="Title"
                onChange={formik.handleChange}
                name="title"
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
              name="fullName"
              {...formik.getFieldProps("fullName")}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>

          <br />
          <TextField
            label="Phone Number "
            variant="outlined"
            sx={{ width: "700px", marginTop: 0.1 }}
            margin="normal"
            name="mobileNumber"
            {...formik.getFieldProps("mobileNumber")}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
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
              value={formik.values.marriageStatus}
              label="Marriage Status"
              onChange={formik.handleChange}
              name="marriageStatus"
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
              Department <span sx={{ color: "red" }}> *</span>
            </InputLabel>{" "}
            <Select
              value={formik.values.department}
              label="Department"
              onChange={formik.handleChange}
              name="department"
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
