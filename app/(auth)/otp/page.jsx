"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import Link from "next/link";
import { TextField } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useFormik } from "formik";

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

export default function Otp() {
  const query = useSearchParams();
  const otpnumber = query.get("otp");
  const phone = query.get("phone");

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [otp, setOtp] = useState(
    otpnumber?.toString().split("") || ["", "", "", ""]
  );

  async function getData(values) {
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employer/verify-opt`,
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
      phone: phone || "",
      otp: otpnumber || "",
    },
    onSubmit: async (values) => {
      try {
        const data = await getData(values);
        // setResponse(data);
        if (data.status === "success") {
          localStorage.setItem("token", JSON.stringify(data.data.token));
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else {
          console.error("Registration failed. Message:", data.message);
        }
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
                staffs overtime, leave day, late day and
                <br />
                live daily wages interactive reports.
                <br />
                Enter the one-time password sent to your mobile number
              </p>
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
              <form onSubmit={formik.handleSubmit}>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                  {/* <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Authentication{" "}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Salary calculation made easy, track your staffs overtime,
                      leave day, late day and live daily wages interactive
                      reports.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Enter the one-time password sent to your mobile number
                    </p>
                  </div> */}

                  {/* OTP input boxes */}
                  <div className="flex space-x-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="w-12 h-12 text-center border rounded-md"
                      />
                    ))}
                  </div>

                  {/* Verify button */}
                  {/* <Link href="/dashboard"> */}
                  <Button type="submit">Verify</Button>
                  {/* </Link> */}

                  {/* <p className="px-8 text-center text-sm text-muted-foreground">
                    <span className="font-bold">Resend OTP</span> |{" "}
                    <span className="font-bold">Change Number</span>
                  </p> */}
                </div>
              </form>

              {/* <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                Phone Number
              </label> */}
              {/* <TextField
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
              Do not receive OTP? Resent OTP in 2:59{" "}
            </p>
            <p style={{ whiteSpace: "pre-line" }}>Change number again </p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
