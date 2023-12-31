"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import { TextField } from "@mui/material";
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

const LogoContainer = styled("div")({
  marginBottom: "16px",
});

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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Image src="/auth/login.png" width={700} height={700} alt="Logo" />
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
            >
              <UserAuthForm />
              {/* <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                Phone Number
              </label>
              <TextField
                id="filled-basic"
                label="Enter your phone number"
                variant="filled"
                sx={{ width: "100%" }}
              /> */}
            </Box>
            {/* <Link href="/otp">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link> */}
            <p style={{ whiteSpace: "pre-line", marginTop: "8px" }}>
              We will send you a one-time password on this mobile number
            </p>
            <p style={{ whiteSpace: "pre-line" }}>
              I have read and agree to the Terms & Services
            </p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
