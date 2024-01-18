"use client";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { addCompany } from "@/redux/companySlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircleOutline } from "@mui/icons-material";
const CreateCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Alphanumeric value only")
      .test(
        "first-letter-alphabet",
        "First letter should be alphabetical for name",
        (value) => {
          return /^[A-Za-z]/.test(value);
        }
      ),
    staffCode: yup.string().required("Please select a staff code"),
    dateSelect: yup.string().required("Please select a date"),
    holidays: yup.string().required("Please enter holidays"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      staffCode: "",
      dateSelect: "",
      holidays: "",
      employee: "0",
      approver: "0",
      qrcode: "  qr code ",
      status: "active",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addCompany(values));
      alert("Company added successfully!");
      resetForm();
      router.push("/dashboard/company");
    },
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          color: "#434345",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.25px",
        }}
      >
        Create New Company
      </Typography>

      {/* breadcrumb area  */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/dashboard" sx={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
            }}
          >
            Dashboard
          </Typography>
        </Link>
        <Link href="/dashboard" sx={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
            }}
          >
            Company
          </Typography>
        </Link>
        <Link href="/dashboard" sx={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
            }}
          >
            New Company
          </Typography>
        </Link>
      </div>

      {/* form area  */}

      <form
        onSubmit={formik.handleSubmit}
        style={{ marginTop: "20px", marginLeft: "30px" }}
      >
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
              {/* Name of the Company */}
              <Typography variant="body1">
                Name of the Company <span sx={{ color: "red" }}> *</span>
              </Typography>
              <TextField
                label="Enter Company Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              {/*
              Staff code Selection
              <Typography variant="body1">Staff Code</Typography>
              <RadioGroup
                row
                name="staffCode"
                value={formik.values.staffCode}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="auto"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Auto"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Custom"
                />
              </RadioGroup>
              {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
                <Typography sx={{ color: "red" }}>
                  {formik.errors.staffCode}
                </Typography>
              )} */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Staff Code
              </Typography>
              <RadioGroup
                row
                name="staffCode"
                value={formik.values.staffCode}
                onChange={formik.handleChange}
              >
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    flexDirection: "column", // Adjusted to make text below the box
                    transition: "background 0.3s, border 0.3s", // Added transition for smoother effect
                    "&:hover": {
                      background: "#f5f5f5",
                    },
                    ...(formik.values.staffCode === "auto"
                      ? { background: "#f5f5f5", border: "1px solid #2196F3" } // Add specific styles for selected option
                      : {}),
                  }}
                  onClick={() => formik.setFieldValue("staffCode", "auto")}
                >
                  <FormControlLabel
                    value="auto"
                    control={
                      <Radio sx={{ width: "50%", color: "transparent" }} />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            formik.values.staffCode === "auto"
                              ? "#2196F3"
                              : "#000",
                        }}
                      >
                        Auto
                      </Box>
                    }
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: "8px",
                      color: "#777",
                    }}
                  >
                    e.g.: Something
                  </Typography>
                  {/* Additional text below the box */}
                </Box>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                    cursor: "pointer",
                    flexDirection: "column", // Adjusted to make text below the box
                    transition: "background 0.3s, border 0.3s", // Added transition for smoother effect
                    "&:hover": {
                      background: "#f5f5f5",
                    },
                    ...(formik.values.staffCode === "custom"
                      ? { background: "#f5f5f5", border: "1px solid #2196F3" } // Add specific styles for selected option
                      : {}),
                  }}
                  onClick={() => formik.setFieldValue("staffCode", "custom")}
                >
                  <FormControlLabel
                    value="custom"
                    control={
                      <Radio sx={{ width: "50%", color: "transparent" }} />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            formik.values.staffCode === "custom"
                              ? "#2196F3"
                              : "#000",
                        }}
                      >
                        Custom
                      </Box>
                    }
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: "8px",
                      color: "#777",
                    }}
                  >
                    e.g.: Something
                  </Typography>
                  {/* Additional text below the box */}
                </Box>
              </RadioGroup>
              {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
                <Typography sx={{ color: "red", marginTop: "4px" }}>
                  {formik.errors.staffCode}
                </Typography>
              )}

              {/* Date selection */}
              <Typography variant="body1">Date Selection</Typography>
              <RadioGroup
                row
                name="dateSelect"
                value={formik.values.dateSelect}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="English"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="English"
                />
                <FormControlLabel
                  value="Nepali"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Nepali"
                />
              </RadioGroup>
              {formik.touched.dateSelect &&
                Boolean(formik.errors.dateSelect) && (
                  <Typography sx={{ color: "red" }}>
                    {formik.errors.dateSelect}
                  </Typography>
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
              {/* Holidays */}
              <Typography variant="body1">Holidays</Typography>
              <RadioGroup
                row
                name="holidays"
                value={formik.values.holidays}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Default Government Holidays"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Default Government Holidays"
                />
                <FormControlLabel
                  value="Custom Holidays"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Custom Holidays"
                />
              </RadioGroup>
              {formik.touched.holidays && Boolean(formik.errors.holidays) && (
                <Typography sx={{ color: "red" }}>
                  {formik.errors.holidays}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button (centered) */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCompany;
