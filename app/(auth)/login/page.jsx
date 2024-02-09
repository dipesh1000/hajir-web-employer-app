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

// Styled components
const BasicGridStyles = {
  image: {
    display: "block",
    maxWidth: "100%",
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

// Validation schema
const validationSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?\d{10,}$/,
      "Invalid phone number. Must be at least 10 digits"
    ),
});

// Main component
export default function Signin() {
  const images = [
    {
      src: "/auth/otp1111.png",
      width: 175,
      height: 190,
      alt: "First Image",
      paragraph:
        "Login with employer will help you to track your <br/> all the staff activities from your smart devices.",
    },
    {
      src: "/auth/otp2222.png",
      width: 175,
      height: 190,
      alt: "Second Image",
      paragraph:
        "You can manage your employee attendance, <br/> salary, overtime and payroll anywhere in the world.",
    },
    {
      src: "/auth/otp3333.png",
      width: 175,
      height: 190,
      alt: "Third Image",
      paragraph:
        "Live attendance, quick reports, allowance & overtime <br/> expense calculation and export reports in csv/excel/pdf.",
    },
  ];
  // commment
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once when the component mounts

  const router = useRouter();
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
      phone: "9808426215",
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
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          {/* Apply styles to the image */}
          <Image
            src="/auth/login.png"
            width={950}
            height={925}
            alt="Logo"
            style={{
              ...BasicGridStyles.image,
              display: useMediaQuery("(max-width:900px)") ? "none" : "block",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </LogoContainer>

            <h2>Authentication</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: images[selectedImageIndex].paragraph,
              }}
            />

            <Image
              src={images[selectedImageIndex].src}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              alt={images[selectedImageIndex].alt}
              style={{ marginTop: "15px" }}
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
                style={{ marginTop: "20px" }}
              />

              <Button
                variant="contained"
                type="submit"
                disabled={buttonClicked}
              >
                Login
              </Button>
            </Box>

            <p style={{ whiteSpace: "pre-line", marginTop: "8px" }}>
              We will send you a one-time password on this mobile number
            </p>

            <p style={{ whiteSpace: "pre-line" }}>
              I have read and agree to the{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={handleOpen}
              >
                Terms & Services
              </span>
            </p>

            <ScrollDialog open={open} onClose={handleClose} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
