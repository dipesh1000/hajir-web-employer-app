"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1Component from "@/components/employee/employeeSteps/Step1Component";
import Step2Component from "@/components/employee/employeeSteps/Step2Component";
import Step3Component from "@/components/employee/employeeSteps/Step3Component";
import Step4Component from "@/components/employee/employeeSteps/Step4Component";
import HeaderEmployeeSteps from "@/components/employee/employeeSteps/HeaderEmployeeSteps";
import { useFormik } from "formik";
import * as yup from "yup"; // Don't forget to import yup

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const stepComponents = [
  <Step1Component key="step1" />,
  <Step2Component key="step2" />,
  <Step3Component key="step3" />,
  <Step4Component key="step4" />,
];

const HorizontalLinearStepper = () => {
  // Define Yup validation schema
  const validationSchema = yup.object({
    // Step 1 validation rules
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
    // Step 2 validation rules
    basicSalary: yup.string().required("Basic Salary is required"),
    allowance: yup.string().required("Allowance is required"),
    salaryAmount: yup.string().required("Salary Amount is required"),
  });

  // Formik instance for the entire form
  const formik = useFormik({
    initialValues: {
      // Initial values for the entire form
      name_holder: "Mr", //required string
      name: "Sarad Shrestha", // required
      code: "C-1853", // required
      contact: "9898981586", // required
      designation: "CEO", // required
      marriage_status: "Unmarried", //required enum['Married', 'Unmarried']
      salary_type: "Weekly", // required - enum ['Weekly', 'Monthly']
      salary: "Fixed", // required - enum ['Fixed', 'Breakdown']
      salary_amount: 2000.0, // required - double
      allowance_amount: 2000.0, // nullable - double
      joining_date: "2023-02-11", // required - date
      working_hours: "8:00", // required
      duty_time: "08:00", // required - time
      probation_period: 1, // required - unsignedBigInt
      break_duration: "300", // required - min/hr to seconds - string
      departments: [1, 2, 3], // required - array - api:{{globalLiveUrl}}/employer/all-departments
      allow_late_attendance: "30", // nullable -time
      casual_leave: 0, //required - unsignedInteger
      sick_leave: 0, //required - unsignedInteger
      overtime_ratio: 2.2, // double(2.2)
      overtime_hrs: 2, // float(2.2)
      week_days_off: [1, 7], // array
      allow_network_access: "All Net", // required - enum['All Net', 'QR']

      // Add other fields for steps 3 and 4 as needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Data:", values);
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const isValid = formik.validateForm();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Main component structure
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "87vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Header */}
      <HeaderEmployeeSteps />

      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        sx={{
          fontSize: "5rem",
          padding: "50px",
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {activeStep === steps.length ? (
          /* Completion Message */
          <div>
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - youre finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          </div>
        ) : (
          /* Display Current Step */
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ mt: 2, mb: 2, flex: 1 }}>
              {stepComponents[activeStep]}
            </Box>
          </div>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          p: 2,
          bg: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ marginRight: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default HorizontalLinearStepper;
