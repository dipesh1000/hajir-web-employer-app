"use client";
// HorizontalLinearStepper.jsx

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import HeaderEmployeeSteps from "@/components/employee/employeeSteps/HeaderEmployeeSteps";
import Step1Component from "@/components/employee/employeeSteps/Step1Component";
import Step2Component from "@/components/employee/employeeSteps/Step2Component";
import Step3Component from "@/components/employee/employeeSteps/Step3Component";
import Step4Component from "@/components/employee/employeeSteps/Step4Component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCandidateMutation } from "@/services/api";
import { useParams, useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const stepComponents = [
  <Step1Component key="step1" />,
  <Step2Component key="step2" />,
  <Step3Component key="step3" />,
  <Step4Component key="step4" />,
];

const validationSchemaStep1 = Yup.object({
  code: Yup.string()
    .required("Staff Code is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
  name_holder: Yup.string().required("Name Holder is required"),
  contact: Yup.string().required("Mobile Number is required"),
  designation: Yup.string().required("Designation is required"),
  marriage_status: Yup.string().required("Marriage Status is required"),
  name: Yup.string().required("Full Name is required"),
  confirmPhoneNumber: Yup.string()
    .required("Confirm Phone Number is required")
    .oneOf([Yup.ref("contact"), null], "Phone Numbers must match"),
  departments: Yup.string().required("Departments is required"),
});

const validationSchemaStep2 = Yup.object({
  allowance_amount: Yup.string().required("Allowance is required"),
  salary_amount: Yup.string().required("Salary Amount is required"),
});

const validationSchemaStep3 = Yup.object({
  week_days_off: Yup.array().required("Week Days Off is required"),
});

const validationSchemaStep4 = Yup.object({
  overtimeChecked: Yup.number().required("Overtime Hours is required"),
  sickLeaveChecked: Yup.number().required("Sick Leave is required"),
  casualLeaveChecked: Yup.number().required("Casual Leave is required"),
  workingHours: Yup.string().required("Working Hours is required"),
  allowLateAttendanceChecked: Yup.number().required(
    "Allow Late Attendance is required"
  ),
  overTimeRatioChecked: Yup.number().required("Over Time Ratio is required"),
});

const HorizontalLinearStepper = () => {
  const { companyId } = useParams();
  console.log(companyId, "companyId by useParams");
  const [createCandidateMutation] = useCreateCandidateMutation(); // Ensure the correct destructuring

  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const validationSchemas = [
    validationSchemaStep1,
    validationSchemaStep2,
    validationSchemaStep3,
    validationSchemaStep4,
  ];

  const formik = useFormik({
    initialValues: {
      name_holder: "Mr", //required string
      name: "BIraj Karki", // required
      code: "CAAA", // required
      contact: "9845971897", // required
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
      departments: 1, // required - array - api:{{globalLiveUrl}}/employer/all-departments
      allow_late_attendance: "30", // nullable -time
      casual_leave: 0, //required - unsignedInteger
      sick_leave: 0, //required - unsignedInteger
      overtime_ratio: 2.2, // double(2.2)
      overtime_hrs: 2, // float(2.2)
      week_days_off: [1, 7], // array
      half_days: [1, 2],

      allow_network_access: "All Net", // required - enum['All Net', 'QR']
      confirmPhoneNumber: "9845971897 ",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Employee being created:", values);

        const { data } = await createCandidateMutation({
          candidateData: values,
          companyId: companyId,
        });

        alert("Candidate added successfully!");
        console.log("Candidate added successfully:", data);
        router.push(`/dashboard/company/${companyId}`);

        resetForm();
      } catch (error) {
        console.error("Error adding candidate:", error);
        alert("Error adding candidate. Please try again.");
      }
    },
  });

  const handleNext = async () => {
    const isLastStep = activeStep === steps.length - 1;
    console.log("Step 1 Form Values:", formik.values);

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      if (isLastStep) {
        formik.handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      console.log("Form validation errors:", errors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleTestSubmit = () => {
    formik.handleSubmit();
  };
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
      <HeaderEmployeeSteps />

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

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {activeStep === steps.length ? (
          <div>
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - youre finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={() => setActiveStep(0)}>Reset</Button>
              </Box>
            </>
          </div>
        ) : (
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ mt: 2, mb: 2, flex: 1 }}>
              {React.cloneElement(stepComponents[activeStep], {
                formik: formik,
                validationErrors: formik.errors, // Pass formik errors to Step1Component
              })}
            </Box>
          </div>
        )}
      </Box>

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

        {/* Test Submit Button */}
        <Button onClick={handleTestSubmit}>Test Submit</Button>
      </Box>
    </Box>
  );
};

export default HorizontalLinearStepper;
