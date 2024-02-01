"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { postRequest } from "@/services/ApiRequestService";
import {
  Box,
  Typography,
  Button,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { addCompany } from "@/redux/companySlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RadioField from "@/components/common/Fields/RadioField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Hamburger from "@/components/common/hamburger";
import CustomRadioGroup from "@/components/company/createcompany/RadioButton";
import InputField from "@/components/common/Fields/InputField";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // State for handling holiday type
  // const [selectedHolidayType, setSelectedHolidayType] = useState("Custom");
  const [apiResponse, setApiResponse] = useState(null);

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
    code: yup.string().required("Please select a staff code"),
    date_type: yup.string().required("Please select a date"),
    holiday_type: yup.string().required("Please enter holiday_type"),
  });

  const formik = useFormik({
    initialValues: {
      name: "asa",
      code: "2",
      address: "tinkune",
      phone: "985632573",
      date_type: "English",
      holiday_type: "Custom",
      custom_holiday_file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("code", values.code);
      formdata.append("address", values.address);
      formdata.append("phone", values.phone);
      formdata.append("date_type", values.date_type);
      formdata.append("holiday_type", values.holiday_type);
      formdata.append("custom_holiday_file", values.custom_holiday_file);

      try {
        const response = await postRequest(
          "/employer/company/store",
          formdata,
          token
        );

        console.log("Response Status:", response.status);

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
          alert("Company added successfully!");
          resetForm();
          // router.push("/dashboard/company");
        } else {
          console.error("Error during API request:", response.statusText);
          const errorData = await response.json(); // You can log detailed error information
          console.error("Detailed Error:", errorData);
        }
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
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

      <Hamburger />

      <form
        onSubmit={formik.handleSubmit}
        style={{ marginTop: "20px" }}
        encType="multipart/form-data"
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
              <InputField
                label="Enter Company Name"
                variant="outlined"
                sx={{ width: "700px" }}
                name="name"
                margin="normal"
                {...formik.getFieldProps("name")}
                // error={
                //   (formik.touched.name && Boolean(formik.errors.name)) ||
                //   "Add Company Name"
                // }
                helperText={formik.touched.name && formik.errors.name}
              />
              <Typography
                variant="body1"
                sx={{ marginTop: 1.6, marginBottom: 2 }}
              >
                Saff Code
              </Typography>
              <CustomRadioGroup
                name="code"
                style={{ width: "100%" }}
                value={formik.values.code}
                // onChange={(value) => formik.setFieldValue("code", value)}
                options={[
                  {
                    value: "auto",
                    label: "Auto",
                    description: "E.g.: R001, R002, ROO3 ",
                  },
                  {
                    value: "custom",
                    label: "Custom",
                    description: "E.g.: 021, 022 or 0100, 0101 ",
                  },
                  // Add more options as needed
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.code && Boolean(formik.errors.code) && (
                <Typography sx={{ color: "red", marginTop: "4px" }}>
                  {formik.errors.code}
                </Typography>
              )}

              {/* New Date Selection  */}

              <Typography
                variant="body1"
                sx={{ marginTop: 1.6, marginBottom: 2 }}
              >
                Date Selection
              </Typography>
              <CustomRadioGroup
                name="date_type"
                value={formik.values.date_type}
                // setFieldValue={formik.setFieldValue}
                // onChange={(value) => formik.setFieldValue("date_type", value)}
                options={[
                  {
                    value: "English",
                    label: "English",
                    description: "e.g.: Something",
                  },
                  {
                    value: "Nepali",
                    label: "Nepali",
                    description: "e.g.: Something",
                  },
                  // Add more options as needed
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.date_type && Boolean(formik.errors.date_type) && (
                <Typography sx={{ color: "red", marginTop: "4px" }}>
                  {formik.errors.date_type}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* -------------------------Right Column ---------------------------------------------------------------------------------------*/}
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                mt: 2,
              }}
            >
              {/* New holiday_type Selection */}
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                holiday_type
              </Typography>

              {/* Default Government holiday_type Box */}
              {/* Default Government holiday_type Box */}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "16px",
                  width: "700px",
                  display: "flex",
                  // alignItems: "center",
                  // flexDirection: "column", // Place items in a column
                  transition: "background 0.3s, border 0.3s",
                  "&:hover": {
                    background: "#f5f5f5",
                  },
                  ...(formik.values.holiday_type ===
                  "Default Government holiday_type"
                    ? { background: "#f5f5f5", border: "1px solid #2196F3" }
                    : {}),
                }}
              >
                <RadioGroup
                  row
                  name="holiday_type"
                  value={formik.values.holiday_type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Default Government holiday_type"
                    control={<Radio />}
                    label="Default Government holiday_type"
                  />
                </RadioGroup>
                {formik.touched.holiday_type &&
                  formik.errors.holiday_type ===
                    "Default Government holiday_type" && (
                    <Typography sx={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.holiday_type}
                    </Typography>
                  )}
              </Box>

              <Link href="/dashboard">
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "8px",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  View holiday_type (.pdf)
                </Typography>
              </Link>

              {/* Custom holiday_type Box */}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "16px",
                  width: "700px",
                  display: "flex",
                  transition: "background 0.3s, border 0.3s",
                  "&:hover": {
                    background: "#f5f5f5",
                  },
                  ...(formik.values.holiday_type === "Custom holiday_type"
                    ? { background: "#f5f5f5", border: "1px solid #2196F3" }
                    : {}),
                  marginTop: "16px", // Adjusted margin for separation
                }}
              >
                <RadioGroup
                  row
                  name="holiday_type"
                  value={formik.values.holiday_type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Custom holiday_type"
                    control={<Radio />}
                    label="Custom holiday_type"
                  />
                </RadioGroup>
                {formik.touched.holiday_type &&
                  formik.errors.holiday_type === "Custom holiday_type" && (
                    <Typography sx={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.holiday_type}
                    </Typography>
                  )}
              </Box>
              <Link href="/dashboard">
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "8px",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Click to download sample file (.xlsx)
                </Typography>
              </Link>

              {/* Upload Button with Icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  flexDirection: "column",
                  marginTop: "16px", // Adjusted margin for separation
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    name="custom_holiday_file"
                    onChange={formik.handleChange}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
            }}
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCompany;
