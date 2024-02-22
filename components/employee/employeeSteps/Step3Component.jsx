import React, { useState } from "react";
import { Box, Checkbox, Grid, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

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
        <Grid item xs={4} key={day}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: formik.values.week_days_off.includes(index + 1)
                ? "2px solid red"
                : "2px solid black",
              borderRadius: "4px",
              padding: "8px",
              width: "90%",
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
              <Typography variant="body2">{day}</Typography>
            </Box>
            {formik.values.week_days_off.includes(index + 1) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={formik.values.half_days.includes(index + 1)}
                  onChange={() => handleHalfDayClick(index)}
                  sx={{ color: "red" }}
                />
                <Typography variant="body2">Half Day?</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={formik.handleSubmit}>
          Log Selection
        </Button>
      </Grid>
    </Grid>
  );
};

export default Step3Component;
