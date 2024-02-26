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
import { useMediaQuery } from "@mui/material";
const Otp = () => {
  const router = useRouter(); // Define the router object using the useRouter hook

  useEffect(() => {
    const token =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("token"));
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      // Redirect to dashboard if user is already logged in
      router.push("/dashboard");
    }
  }, [router]);
  const query = useSearchParams();
  const otpnumber = query.get("otp");
  const phone = query.get("phone");

  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const [otp, setOtp] = useState(
    otpnumber?.toString().split("") || ["", "", "", ""]
  );
  const [loading, setLoading] = useState(false);
  const isScreenSmall = useMediaQuery("(max-width:900px)");
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
        setLoading(true);
        const data = await getData(values);
        if (data.status === "success") {
          console.log("OTP verification successful");
          localStorage.setItem("token", JSON.stringify(data.data.token));
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setIsLoggedIn(true);
          setAuthUser({ user: data.data.user, token: data.data.token });
          router.push("/dashboard");
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
        const inputBox = document.getElementById(`otp-input-${index}`);
        const inputLength = inputBox.value.length;
        inputBox.setSelectionRange(inputLength, inputLength);
      }
    } else {
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
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh", // Adjusted minHeight instead of maxHeight
      objectFit: "cover",
      overflow: "hidden",}}>
      <Grid container  spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          
          {!isMobile && ( // Hide the image on mobile screens
            <Image
            src="/auth/login.png"
              alt="login image"
              // layout="responsive" // Making the image responsive
              width={isMobile ? 300 : 900} // Adjusted width based on screen size
              height={900}
              style={ {  display: "block",
              maxWidth: "100%",
              height: "auto",}}
              priority
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper style={{
          
            typography: "body2",
            padding: "16px",
            textAlign: "center",
            color: "gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            boxShadow: "none",
            elevation: 0,
            background: "transparent",
          }}>
            <div style={{marginTop:"50px"}}>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </div>
            {/* <div>
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
            </div> */}
             <div>
              
              <h1 style={{ color: 'rgba(34, 64, 139, 0.87)' , fontWeight:'500', fontSize:'18px', marginTop:'-10px'}}>Smart attendance system</h1>
                        
                           <h1 style={{fontWeight:'400', fontSize:'14px',whiteSpace: "pre-line",marginTop:'5px'}}>Enter the OTP code that has been sent to your mobile number </h1>
                         </div>
            <Image
src="/auth/maskotp.png"
    width={175}
    height={170}
   style={{marginTop:'20px', marginBottom:'60px'}}
   alt="otp"
/>

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
                        marginTop:'-20px'
                      }}
                    />
                  ))}
                </div>

                <br />

                {/* Verify button */}
            
                <Button type="submit" variant="contained" color="primary" sx={{marginTop:'5px', width:'260px'}}>
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
                marginTop:'2px'
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Otp;
