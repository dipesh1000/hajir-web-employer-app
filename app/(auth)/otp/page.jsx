"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "@/context/AuthContext";
import { useFormik } from "formik";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { postRequest } from "@/services/ApiRequestService";

// Styles for components
const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    // Hide the image on screens smaller than 600px
    "@media (maxWidth: 600px)": {
      display: "none",
    },
  },
};
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

const Otp = () => {
  const query = useSearchParams();
  const otpnumber = query.get("otp");
  const phone = query.get("phone");
  const router = useRouter();

  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const [otp, setOtp] = useState(
    otpnumber?.toString().split("") || ["", "", "", ""]
  );
  const [loading, setLoading] = useState(false);
  const isScreenSmall = useMediaQuery("(max-width:900px)");

  async function getData(values) {
    const apiResponse = await postRequest(`/employer/verify-opt`, values);
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
        setLoading(true);
        const data = await getData(values);
        if (data.status === "success") {
          console.log("OTP verification successful");
          localStorage.setItem("token", JSON.stringify(data.data.token));
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setIsLoggedIn(true);
          setAuthUser({ user: data.data.user, token: data.data.token });
          router.push("/dashboard");
          refetch();
        } else {
          console.error("OTP verification failed. Message:", data.message);
          alert("Wrong OTP. Please enter the correct OTP.");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error.message);
        alert("An error occurred during OTP verification. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  if (otpnumber === "" || otpnumber === null) {
    console.error(
      "OTP is missing or empty. Please request a new OTP and verify."
    );
  }

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value !== "") {
      const nextIndex = index + 1;
      if (nextIndex < newOtp.length) {
        document.getElementById(`otp-input-${nextIndex}`).focus();
      } else {
        // Move the cursor to the right side of the input box
        const inputBox = document.getElementById(`otp-input-${index}`);
        const inputLength = inputBox.value.length;
        inputBox.setSelectionRange(inputLength, inputLength);
      }
    } else {
      // Move to the left side of the previous input box if deleted
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        document.getElementById(`otp-input-${prevIndex}`).focus();
      }
    }

    setOtp(newOtp);
    let otpString = newOtp ? newOtp.join("") : "";
    formik.setFieldValue("otp", otpString);
  };

  // timer

  const [timer, setTimer] = useState(30); // 3 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  const handleResendClick = () => {
    // Handle resend logic here (use client)
    console.log("Resend button clicked");

    // Reset the timer
    setTimer(30);
    // Activate the timer
    setTimerActive(true);
  };

  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = timer % 60;

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Image
            src="/auth/login.png"
            width={950}
            height={925}
            alt="Logo"
            style={{
              ...styles.image,
              display: isScreenSmall ? "none" : "block",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
              onSubmit={formik.handleSubmit}
            >
              <div
                sx={{
                  marginX: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Loading indicator */}
                {loading && <p>Loading...</p>}

                {/* OTP input boxes */}
                <div className="flex space-x-2">
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      inputProps={{ maxLength: 1 }}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "50px", // Adjust the width as needed
                        height: "40px", // Adjust the height as needed
                        textAlign: "center",
                        justifyContent: "center",
                        marginRight: "20px",
                        alignItems: "center",
                        paddingLeft: "8px", // Add marginRight to create a gap between input boxes
                      }}
                    />
                  ))}
                </div>

                <br />

                {/* Verify button */}
                <Button type="submit" variant="contained" color="primary">
                  Verify
                </Button>
              </div>
            </Box>

            <div
              style={{
                whiteSpace: "pre-line",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ color: timer === 0 ? "red" : "inherit" }}>
                Do not receive OTP? Resend OTP in{" "}
                <span style={{ color: "red" }}>
                  {timerMinutes}:
                  {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </span>
              </p>
              {timer === 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleResendClick}
                  style={{
                    marginLeft: "8px",
                    borderColor: "red",
                    color: "red",
                  }}
                >
                  Resend
                </Button>
              )}
            </div>

            <p
              style={{
                whiteSpace: "pre-line",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#3f51b5",
              }}
              onClick={() => router.push("/login")}
            >
              Change number again{" "}
            </p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Otp;
