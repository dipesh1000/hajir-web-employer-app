"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { styled, useTheme } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "800px",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    maxWidth: "none",
    paddingLeft: 0,
  },
}));

const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(10),
  },
}));

const OTPPage = ({ phone }) => {
  const theme = useTheme();
  const [otp, setOtp] = useState(["", "", "", ""]);

  async function getData(values) {
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employer/password-submit`,
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
    return apiResponse.json();
  }

  const formik = useFormik({
    initialValues: {
      phone: +phone || "",
      otp: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await getData(values);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to the dashboard or desired page after successful login
        router.push("/dashboard"); // Update with your desired route
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
    },
    enableReinitialize: true,
  });

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    let otpString = newOtp ? newOtp.join("") : "";
    formik.setFieldValue("otp", otpString);
  };

  return (
    <>
      <Container>
        <div className="md:hidden">{/* Your Image components here... */}</div>
        <Content>
          <Link
            href="https://hajirapp.com"
            className={"absolute right-4 top-4 md:right-8 md:top-8"}
          >
            <Button variant="outlined" color="primary">
              Official Site
            </Button>
          </Link>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Enter OTP
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the one-time password sent to your mobile number
              </p>
            </div>

            {/* OTP input boxes */}
            <div className="flex space-x-4">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  fullWidth
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-12 h-12 text-center border rounded-md"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              Verify
            </Button>

            <p className="px-8 text-center text-sm text-muted-foreground">
              <span className="font-bold">Resend OTP</span> |{" "}
              <span className="font-bold">Change Number</span>
            </p>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default OTPPage;
