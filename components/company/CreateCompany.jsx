"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import UserAuthForm from "@/components/Auth/UserAuthForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

export default function Signin() {
  const [response, setResponse] = useState({});
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employer/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await apiResponse.json();
        setResponse(data);
        if (data.status === "success") {
          alert(`Successfully Registered.  \n Your OTP is: ${data.data.otp}`);
          console.log("OTP:values", data.data.otp);
          // console.log('Token:', data.data.token);
          router.push(`/signin?phone=${values.phone}&otp=${data.data.otp}`);
        } else {
          console.error("Registration failed. Message:", data.message);
        }
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
    },
  });

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Add New Company{" "}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {" "}
          <Typography variant="h6" gutterBottom>
            Name of your Company
          </Typography>{" "}
          <TextField id="standard-basic" label="Standard" variant="standard" />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Staff Code
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Date Selection
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="English"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel
                value="Nepali"
                control={<Radio />}
                label="Nepali"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Salary Calculation
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Calendar Days"
                control={<Radio />}
                label="Calendar Days"
              />
              <FormControlLabel
                value="30 Days"
                control={<Radio />}
                label="30 Days"
              />
            </RadioGroup>
            <Datepicker controls={["calendar"]} selectMultiple={true} />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <div>
            <h2>Authentication</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              Salary calculation made easy, track your
              <br />
              staffs overtime, leave day, late day, and
            </p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
