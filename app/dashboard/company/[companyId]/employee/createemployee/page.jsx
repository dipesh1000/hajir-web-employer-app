"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation"; // Correct import
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { addEmployeeToCompany } from "@/redux/companySlice"; // Correct import
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CreateEmployee() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { companyId } = useParams();

  // const employeeId = useSelector((state) => {
  //   const employees = state.employee.employees;
  //   const foundEmployee =
  //     employees && employees.length
  //       ? employees.find((employee) => employee.id === String(companyId))
  //       : undefined;

  //   return foundEmployee;
  //   console.log("foundEmployee:", foundEmployee); // Log the found company
  // });

  const validationSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    salaryAmount: yup.string().required("Enter your salary amount"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      salaryAmount: "",
    },
    validationSchema: validationSchema,
    // onSubmit:  (values, { resetForm }) => {
    //   const { fullName, salaryAmount } = values;
    //   const employee = {
    //     fullName,
    //     salaryAmount,
    //   };
    //   await dispatch(addEmployeeToCompany({ companyId, employee }));

    onSubmit: (values, { resetForm }) => {
      dispatch(addEmployeeToCompany({ companyId, employee: values }));
      alert("Employee added successfully!");
      resetForm();
      router.push(`/dashboard/company/${companyId}`);
    },
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Typography variant="h5">Add New Employee</Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Enter the full name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="body1">Full Name</Typography>
          <Typography variant="body1" color="red" ml={1}>
            *
          </Typography>
        </Box>
        <TextField
          label="Enter your name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("fullName")}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        {/* salary section  */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="body1">salaryAmount</Typography>
          <Typography variant="body1" color="red" ml={1}>
            *
          </Typography>
        </Box>
        <TextField
          label="Enter your salaryAmount"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("salaryAmount")}
          error={
            formik.touched.salaryAmount && Boolean(formik.errors.salaryAmount)
          }
          helperText={formik.touched.salaryAmount && formik.errors.salaryAmount}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
