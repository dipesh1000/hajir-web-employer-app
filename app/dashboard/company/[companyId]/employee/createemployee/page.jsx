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

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const stepComponents = [
  <Step1Component key="step1" />,
  <Step2Component key="step2" />,
  <Step3Component key="step3" />,
  <Step4Component key="step4" />,
];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <HeaderEmployeeSteps />
      <Stepper
        activeStep={activeStep}
        sx={{
          fontSize: "5rem", // Adjust the font size as needed
          padding: "40px", // Adjust the padding as needed
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ mt: 2, mb: 2 }}>{stepComponents[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HorizontalLinearStepper;
