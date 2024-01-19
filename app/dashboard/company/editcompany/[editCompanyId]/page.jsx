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

import { editCompany, setCompanyIdToEdit } from "@/redux/companySlice";
import CustomRadioGroup from "@/components/company/createcompany/RadioButton";

const EditCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editCompanyId } = useParams();

  const companyToEdit = useSelector((state) => {
    const companies = state.company.companies;
    const foundCompany =
      companies && companies.length
        ? companies.find((company) => company.id === String(editCompanyId))
        : undefined;

    return foundCompany;
  });

  const defaultString = "";
  const {
    name,
    staffCode,
    dateSelect,
    calculationType,
    department,
    holidays,
    employee,
    approver,
    qrcode,
    status,
  } = companyToEdit || {};

  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    staffCode: yup.string().required("Please select a staff code"),
    dateSelect: yup.string().required("Please select a date"),
    holidays: yup.string().required("Please enter holidays"),
  });

  const formik = useFormik({
    initialValues: {
      name: name || "",
      staffCode: staffCode || "",
      dateSelect: dateSelect || "",
      calculationType: calculationType || "",
      department: department || "",
      holidays: holidays || "",
      employee: employee || "0",
      approver: approver || "0",
      qrcode: qrcode || "  qr code ",
      status: status || "active",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(editCompany({ id: editCompanyId, updatedCompany: values }));
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
      <Typography variant="h5">Update your Company</Typography>

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
                testing
              </Typography>
              <CustomRadioGroup
                name="staffCode"
                value={formik.values.staffCode}
                options={[
                  {
                    value: "auto",
                    label: "Auto",
                    description: "e.g.: Something",
                  },
                  {
                    value: "custom",
                    label: "Custom",
                    description: "e.g.: Something",
                  },
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
                <Typography sx={{ color: "red", marginTop: "4px" }}>
                  {formik.errors.staffCode}
                </Typography>
              )}

              {/* New Date Selection  */}
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Date Selection
              </Typography>
              <CustomRadioGroup
                name="dateSelect"
                value={formik.values.dateSelect}
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
              {formik.touched.dateSelect &&
                Boolean(formik.errors.dateSelect) && (
                  <Typography sx={{ color: "red", marginTop: "4px" }}>
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
                  ...(formik.values.holidays === "Default Government Holidays"
                    ? { background: "#f5f5f5", border: "1px solid #2196F3" }
                    : {}),
                }}
              >
                <RadioGroup
                  row
                  name="holidays"
                  value={formik.values.holidays}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Default Government Holidays"
                    control={<Radio />}
                    label="Default Government Holidays"
                  />
                </RadioGroup>
                {formik.touched.holidays &&
                  formik.errors.holidays === "Default Government Holidays" && (
                    <Typography sx={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.holidays}
                    </Typography>
                  )}
              </Box>

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
                  marginTop: "16px", // Adjusted margin for separation
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
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Upload File
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button (centered) */}
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
            Update Company
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditCompany;
