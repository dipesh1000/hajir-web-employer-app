"use client";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  LinearProgress,
} from "@mui/material";

import CustomRadioGroup from "@/components/company/createcompany/RadioButton";
import Link from "next/link";
import { useGetActiveCompanyQuery } from "@/services/api";
import { useUpdateCompanyMutation } from "@/services/api";
import { useState } from "react";

const EditCompany = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const { editCompanyId } = useParams();
  const getActiveCompany = useGetActiveCompanyQuery();
  const [updateCompany] = useUpdateCompanyMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // console.log(getActiveCompany, "getActiveCompany");
  // console.log(editCompanyId);
  const companyDataToUpdate = getActiveCompany.data?.data?.companies || [];
  const selectedCompany = companyDataToUpdate.find(
    (company) => company.id === parseInt(editCompanyId, 10)
  );

  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    // code: yup.string().required("Please select a staff code"),
    date_type: yup.string().required("Please select a date"),
    holiday_type: yup.string().required("Please enter holidays"),
  });
  // console.log(selectedCompany?.code, "this is for testing");

  const formik = useFormik({
    initialValues: {
      name: selectedCompany?.name || "",
      // name: "",
      // code: selectedCompany?.code || "",
      date_type: selectedCompany?.date_type || "",
      holiday_type: selectedCompany?.holiday_type || "",
      custom_holiday_file: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Data being updated and sent:", values);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("date_type", values.date_type);
        formData.append("holiday_type", values.holiday_type);
        formData.append("custom_holiday_file", file);

        // Call the mutation function directly
        const { data } = await updateCompany({
          company_id: editCompanyId,
          companyData: formData,
        });

        console.log("Company updated successfully:", data);

        // Show success message
        alert("Company updated successfully!");

        // Reset the form
        resetForm();

        // Navigate to the company dashboard or any other desired location
        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error adding company:", error);

        // Show a user-friendly error message
        alert("Error adding company. Please try again.");
      }
    },
  });

  // console.log(selectedCompany, "selectedCompany");
  // console.log(selectedCompany?.name || "", "name");
  // console.log(selectedCompany?.code || "", "code");
  // console.log(selectedCompany?.date_type || "", "date_type");
  // console.log(selectedCompany?.holiday_type || "", "holiday_type");

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
        Update Company
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
            Update Company
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

              {/* New Date Selection  */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Date Selection
              </Typography>
              <CustomRadioGroup
                name="date_type"
                value={formik.values.date_type}
                {...formik.getFieldProps("date_type")}
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
              {/* New Holidays Selection */}
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
                {/* {isLoading && <LinearProgress value={uploadProgress} />} */}

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
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
            }}
          >
            Update{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditCompany;
