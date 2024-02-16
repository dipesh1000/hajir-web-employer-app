"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,
  LinearProgress,
} from "@mui/material";
// import { addCompany } from "@/redux/companySlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import RadioField from "@/components/common/Fields/RadioField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Hamburger from "@/components/common/hamburger";
import CustomRadioGroup from "@/components/company/createcompany/RadioButton";
import InputField from "@/components/common/Fields/InputField";
import { useCreateCompanyMutation } from "@/services/api";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const createCompanyMutation = useCreateCompanyMutation();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      name: "",
      code: "",
      date_type: "",
      holiday_type: "",
      // custom_holiday_file: "",
    },
    validationSchema: validationSchema,
    // onSubmit function
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        console.log("Data being sent:", values);
        // Prepare form data
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("code", values.code);
        formData.append("date_type", values.date_type);
        formData.append("holiday_type", values.holiday_type);
        formData.append("custom_holiday_file", file);

        // Destructure the elements of the array
        const [mutateAsync] = createCompanyMutation;

        const { data } = await mutateAsync(formData, {
          onUploadProgress: (progressEvent) => {
            // Calculate upload progress
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        });

        await mutateAsync(values);
        console.log("Company added successfully:", data);

        alert("Company added successfully!");
        // Reset the form
        resetForm();

        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error adding company:", error);

        // Show a user-friendly error message
        alert("Error adding company. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log(uploadedFile);
  };
  const handleDownload = (fileName) => {
    const filePath = `/${fileName}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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

              {/* New Staff Code Selection  */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Staff Code{" "}
              </Typography>
              <CustomRadioGroup
                name="code"
                value={formik.values.code}
                // onChange={(value) => formik.setFieldValue("code", value)}
                options={[
                  {
                    value: "1",
                    label: "Auto",
                    description: "E.g.: R001, R002, ROO3 ",
                  },
                  {
                    value: "2",
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

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Date Selection
              </Typography>
              <CustomRadioGroup
                name="date_type"
                value={formik.values.date_type}
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
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Holidays
              </Typography>
              <Box sx={{ marginBottom: "16px" }}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",
                    width: "500px",
                    display: "flex",
                    transition: "background 0.3s, border 0.3s",
                    "&:hover": { background: "#f5f5f5" },
                    marginTop: "16px",
                  }}
                >
                  <RadioGroup
                    row
                    name="holiday_type"
                    value={formik.values.holiday_type}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="Government"
                      control={<Radio />}
                      label="Default Government Holidays"
                    />
                  </RadioGroup>
                </Box>
                {/* need to pdate this part */}
                {formik.touched.holiday_type &&
                  formik.errors.holiday_type === "" && (
                    <Typography sx={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.holiday_type}
                    </Typography>
                  )}
              </Box>
              <Button onClick={() => handleDownload("example1.pdf")}>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  View Holidays (.pdf)
                </Typography>
              </Button>
              <Box>
                {/* Custom Holidays Box */}
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",
                    width: "500px",
                    display: "flex",
                    transition: "background 0.3s, border 0.3s",
                    "&:hover": { background: "#f5f5f5" },
                    marginTop: "16px",
                  }}
                >
                  <RadioGroup
                    row
                    name="holiday_type"
                    value={formik.values.holiday_type}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="Custom"
                      control={<Radio />}
                      label="Custom Holidays"
                    />
                  </RadioGroup>
                </Box>
              </Box>
              <Button onClick={() => handleDownload("SpecialHoliday.xls")}>
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
              </Button>{" "}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "16px",
                }}
              >
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" onChange={handleFileChange} hidden />
                </Button>
                {isLoading && <LinearProgress value={uploadProgress} />}

                {/* Conditionally render the file name if uploadedFile is not null */}
                {file && (
                  <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    Uploaded File: {file.name}
                  </Typography>
                )}
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
            disabled={isLoading}
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
