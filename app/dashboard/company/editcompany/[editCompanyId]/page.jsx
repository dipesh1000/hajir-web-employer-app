// Import necessary modules
"use client";
import { useEffect } from "react";
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
} from "@mui/material";
import {
  editCompany,
  setCompanyIdToEdit,
  // Add the action to fetch company details
} from "@/redux/companySlice";

const EditCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editCompanyId } = useParams();

  const companyToEdit = useSelector((state) => {
    console.log("state:", state); // Log the entire state to see its structure

    const foundCompany = state.companies?.find(
      (company) => company.id === String(editCompanyId)
    );

    console.log("foundCompany:", foundCompany); // Log the found company

    return foundCompany;
  });

  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    staffCode: yup.string().required("Please select a staff code"),
    dateSelect: yup.string().required("Please select a date"),
    calculationType: yup.string().required("Please select a calculation type"),
    department: yup.string().required("Please enter a department"),
    holidays: yup.string().required("Please enter holidays"),
  });

  const formik = useFormik({
    initialValues: {
      name: companyToEdit?.name || "",
      staffCode: companyToEdit?.staffCode || "",
      dateSelect: companyToEdit?.dateSelect || "",
      calculationType: companyToEdit?.calculationType || "",
      department: companyToEdit?.department || "",
      holidays: companyToEdit?.holidays || "",
      employee: companyToEdit?.employee || "0",
      approver: companyToEdit?.approver || "0",
      qrcode: companyToEdit?.qrcode || "null",
      status: companyToEdit?.status || "active",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(editCompany({ id: editCompanyId, updatedCompany: values }));
      resetForm();
      router.push("/dashboard/company");
    },
  });

  useEffect(() => {
    if (!companyToEdit) {
      // Dispatch an action to fetch the company details based on companyId
      // Example: dispatch(setCompanyIdToEdit(editCompanyId));
      dispatch(setCompanyIdToEdit(editCompanyId));
    }
  }, [editCompanyId, companyToEdit, dispatch]);

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
      <form onSubmit={formik.handleSubmit}>
        {/* Name of the company */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="body1">Name of the Company</Typography>
          <Typography variant="body1" color="red" ml={1}>
            *
          </Typography>
        </Box>
        <p>Company Id: {editCompanyId}</p>

        <TextField
          label="Enter Company Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        {/* Staff code Selection */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
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
        </Box>
        {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
          <Typography sx={{ color: "red" }}>
            {formik.errors.staffCode}
          </Typography>
        )}

        {/* Date selection */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
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
        </Box>
        {formik.touched.dateSelect && Boolean(formik.errors.dateSelect) && (
          <Typography sx={{ color: "red" }}>
            {formik.errors.dateSelect}
          </Typography>
        )}

        {/* Salary calculation */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography variant="body1">Salary Calculation</Typography>
          <RadioGroup
            row
            name="calculationType"
            value={formik.values.calculationType}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="Calendar Days"
              control={<Radio sx={{ width: "50%" }} />}
              label="Calendar Days"
            />
            <FormControlLabel
              value="30 Days"
              control={<Radio sx={{ width: "50%" }} />}
              label="30 Days"
            />
          </RadioGroup>
        </Box>
        {formik.touched.calculationType &&
          Boolean(formik.errors.calculationType) && (
            <Typography sx={{ color: "red" }}>
              {formik.errors.calculationType}
            </Typography>
          )}

        {/* Create Department */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="body1">Create Department</Typography>
          <Typography variant="body1" color="red" ml={1}>
            *
          </Typography>
        </Box>
        <TextField
          label="Enter Department Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("department")}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
        />

        {/* Holday */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
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
        </Box>
        {formik.touched.holidays && Boolean(formik.errors.holidays) && (
          <Typography sx={{ color: "red" }}>
            {formik.errors.holidays}
          </Typography>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Update Company
        </Button>
      </form>
    </Box>
  );
};

export default EditCompany;
