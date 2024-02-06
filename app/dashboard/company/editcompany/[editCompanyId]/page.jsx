"use client";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
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
import AddIcon from "@mui/icons-material/Add";

import CustomRadioGroup from "@/components/company/createcompany/RadioButton";
import Link from "next/link";
import {
  useGetActiveCompanyQuery,
  useUpdateCompanyMutation,
} from "@/services/api";

const EditCompany = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { editCompanyId } = useParams();

  const getActiveCompany = useGetActiveCompanyQuery();
  const UpdateCompany = useUpdateCompanyMutation();
  const mutateAsync = UpdateCompany.mutate; // Remove the array destructuring

  console.log(getActiveCompany, "getActiveCompany");
  console.log(editCompanyId);
  const companyDataToUpdate = getActiveCompany.data?.data?.companies || [];
  const selectedCompany = companyDataToUpdate.find(
    (company) => company.id === parseInt(editCompanyId, 10)
  );

  console.log(selectedCompany, "selectedCompany");
  console.log(selectedCompany?.name || "", "name");
  console.log(selectedCompany?.code || "", "code");
  console.log(selectedCompany?.date_type || "", "date_type");
  console.log(selectedCompany?.holiday_type || "", "holiday_type");
  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    code: yup.string().required("Please select a staff code"),
    date_type: yup.string().required("Please select a date"),
    holiday_type: yup.string().required("Please enter holidays"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedCompany?.name || "",
      code: selectedCompany?.generate_code ? "1" : "2",
      date_type: selectedCompany?.date_type || "",
      holiday_type: selectedCompany?.holiday_type || "Custom",
    },

    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Data being updated and sent:", values);

        // Use the mutate function for triggering the mutation
        await mutateAsync(values);

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
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              {/* New Staff Code Selection  */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                testing
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
              {/* New Holidays Selection */}
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Holidays
              </Typography>

              {/* Default Government Holidays Box */}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "16px",
                  width: "100%",
                  display: "flex",

                  transition: "background 0.3s, border 0.3s",
                  "&:hover": {
                    background: "#f5f5f5",
                  },
                  ...(formik.values.holiday_type ===
                  "Default Government Holidays"
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
                    value="Custom"
                    control={<Radio />}
                    label="Default Government Holidays"
                  />
                </RadioGroup>
                {formik.touched.holiday_type &&
                  formik.errors.holiday_type ===
                    "Default Government Holidays" && (
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
                  View Holidays (.pdf)
                </Typography>
              </Link>

              {/* Custom Holidays Box */}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "16px",
                  width: "100%",
                  display: "flex",
                  transition: "background 0.3s, border 0.3s",
                  "&:hover": {
                    background: "#f5f5f5",
                  },
                  ...(formik.values.holidays === "Custom Holidays"
                    ? { background: "#f5f5f5", border: "1px solid #2196F3" }
                    : {}),
                  marginTop: "16px",
                }}
              >
                <RadioGroup
                  row
                  name="holidays"
                  value={formik.values.holidays}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Custom Holidays"
                    control={<Radio />}
                    label="Custom Holidays"
                  />
                </RadioGroup>
                {formik.touched.holidays &&
                  formik.errors.holidays === "Custom Holidays" && (
                    <Typography sx={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.holidays}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  // startIcon={<AddIcon />}
                >
                  Upload File
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
            Update{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditCompany;
