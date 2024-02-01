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

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

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
    <Box
      sx={{
        width: "100%",
        minHeight: "87vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        // backgroundColor: "#F7F7F9",
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
          <Step key={label} onClick={() => handleStepClick(index)}>
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
            <Box sx={{ mt: 2, mb: 2, flex: 1 }}>
              {stepComponents[activeStep]}
            </Box>
          </>
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
      </Box>
    </Box>
  );
};

export default HorizontalLinearStepper;
