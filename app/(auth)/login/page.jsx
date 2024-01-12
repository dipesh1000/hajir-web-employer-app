"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import * as yup from "yup";

import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

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
  boxShadow: "none",
  elevation: 0,
  background: "transparent",
}));

const LogoContainer = styled("div")({
  marginBottom: "16px",
});
const validationSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?\d{10,}$/,
      "Invalid phone number. Must be at least 10 digits"
    ),
});

export default function Signin() {
  const router = useRouter();
  const [response, setResponse] = useState({});

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
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
          console.log("OTP:values", data.data.token);
          router.push(`/otp?phone=${values.phone}&otp=${data.data.otp}`);
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Image src="/auth/login.png" width={750} height={750} alt="Logo" />
        </Grid>
        <Grid item xs={6}>
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </LogoContainer>
            <div>
              <h2>Authentication</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                Salary calculation made easy, track your
                <br />
                staffs overtime, leave day, late day, and
                <br />
                live daily wages interactive reports.
              </p>
              <Image
                src="/auth/login-min.png"
                width={140}
                height={120}
                alt="Logo"
              />
            </div>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                placeholder="+977 9841234567"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 5, width: "120px" }}
              >
                Login
              </Button>
              <p style={{ whiteSpace: "pre-line", marginTop: "8px" }}>
                We will sent OTP on this mobile number
              </p>
              <p style={{ whiteSpace: "pre-line" }}>
                I have read and agree to the Terms & Services
              </p>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
