import React, { useState } from "react";
import { Box, Checkbox, Grid, Typography, Button, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const Step3Component = ({ formik }) => {
  onSubmit: (values) => {
    console.log(values);
  };

const Step3Component = ({ formik }) => {
  onSubmit: (values) => {
    console.log(values);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayClick = (index) => {
    if (!formik.values.week_days_off.includes(index + 1)) {
      formik.setValues({
        ...formik.values,
        week_days_off: [...formik.values.week_days_off, index + 1],
      });
    } else {
      formik.setValues({
        ...formik.values,
        week_days_off: formik.values.week_days_off.filter(
          (day) => day !== index + 1
        ),
      });
    }
  };

  const handleHalfDayClick = (index) => {
    if (!formik.values.half_days.includes(index + 1)) {
      formik.setValues({
        ...formik.values,
        half_days: [...formik.values.half_days, index + 1],
      });
    } else {
      formik.setValues({
        ...formik.values,
        half_days: formik.values.half_days.filter((day) => day !== index + 1),
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {days.map((day, index) => (
        <Grid item  sm={4}  key={day}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #F0F0F0",
              borderRadius: "4px",
              padding: "6px",
              width: "93%",

              cursor: "pointer",
              marginBottom: "8px",
            }}
            onClick={() => handleDayClick(index)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={formik.values.week_days_off.includes(index + 1)}
                onChange={() => handleDayClick(index)}

                sx={{
                  color: formik.values.week_days_off.includes(index + 1)
                    ? "red"
                    : "black",

                }}
              />
              <Typography variant="body2"  sx={{
                  color: formik.values.week_days_off.includes(index + 1)
                    ? "red"
                    : "black",
                }}>{day}</Typography>
            </Box>
            {formik.values.week_days_off.includes(index + 1) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderLeft: "1px solid #E0E0E0",
                 marginLeft:'4px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={formik.values.half_days.includes(index + 1)}
                  onChange={() => handleHalfDayClick(index)}
                  // sx={{ color: "red" }}
                />
                <Typography variant="body2">Half Day?</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}

    </Grid>
  );
};
export default Step3Component;
