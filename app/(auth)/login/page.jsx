"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import ScrollDialog from "@/components/Auth/ScrollDialog";
import { postRequest } from "@/services/ApiRequestService";

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
  const images = [
    {
      src: "/auth/otp1111.png",
      width: 175,
      height: 180,
      alt: "First Image",
   
      content: (
        <>
          <p>Login with employer will help you to <br/>track your
         all the staff activities from your <br/>smart devices.</p>
        </>
      ),
    },
    {
      src: "/auth/otp2222.png",
      width: 175,
      height: 180,
      alt: "Second Image",
      content: (
        <>
          <p>You can manage your employee <br/>
           attendance, salary,overtime and payroll <br/>
           anywhere in the world.</p>
        </>
      ),
    },
    {
      src: "/auth/otp3333.png",
      width: 175,
      height: 180,
      alt: "Third Image",
      content: (
        <>
          <p>Live attendance, quick reports,<br/>allowance & overtime
          expense calculation  <br/> and export reports in csv/excel/pdf.</p>
        </>
      ),
    },
  ];
  // commment
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once when the component mounts

  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Use media query hook
  const isScreenSmall = useMediaQuery("(max-width:900px)");

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (buttonClicked) {
          return;
        }

        setButtonClicked(true);
        const apiResponse = await postRequest(`/employer/register`, values);

        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await apiResponse.json();

        if (data.status === "success") {
          alert(`Successfully Registered.  \n Your OTP is: ${data.data.otp}`);
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
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      objectFit: "cover",
      overflow: "hidden",
    
    }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          {!isScreenSmall && (
            <Image
              src="/auth/login.png"
              alt="login image"
              // layout="responsive" // Making the image responsive
              width={isScreenSmall ? 300 : 900} // Adjusted width based on screen size
              height={900}
              style={{   display: "block",
              maxWidth: "100%",
              height: "auto",}}
              priority
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>

        <Paper
            sx={{
              backgroundColor: theme => theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              typography: "body2",
              padding: "16px",
              textAlign: "center",
              color: theme => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              boxShadow: "none",
              elevation: 0,
              background: "transparent",
            }}
          >
          
            <div style={{marginTop:'50px', marginBottom:'0px'}}>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo"/>
            </div>

         <h1 style={{ color: 'rgba(34, 64, 139, 0.87)' , fontWeight:'500', fontSize:'18px', marginTop:'3px'}}>Smart attendance system</h1>
       
            <div style={{ marginBottom: "0px" , fontWeight:'500', marginTop:'-7px', paddingTop:'0px', paddingBottom:'0px', marginTop:'-6px'}}>
              {images[selectedImageIndex].content}
            </div>

            <Image
              src={images[selectedImageIndex].src}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              alt={images[selectedImageIndex].alt}
              style={{ marginTop: "0px" }}
              priority
            />
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              style={{ width: "250px" }}
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
                style={{
                  marginTop: "26px",
                  width: "300px",
                  marginLeft: "6px",
              justifyContent:'center',
              alignItems:'center'
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={buttonClicked}
                style={{ width: "300px", marginLeft: "10px", marginTop:'2px' }}
              >
                Get OTP
              </Button>
        
            </Box>

            <p style={{ whiteSpace: "pre-line", marginTop: "10px" , marginBottom:'13px', color:'black', fontSize:'14px'}}>
              We will send OTP on this mobile number
            </p>

            <p style={{ whiteSpace: "pre-line" , marginTop:'-6px', color:'black', marginBottom:'20px'}}>
              I have read and agree {" "}
              <span
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleOpen}

              >
                Terms & Services
              </span>
            </p>

            <ScrollDialog open={open} onClose={handleClose} />
          
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}