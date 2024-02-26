"use client"
import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

export default function BasicGrid() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [
    {
      src: "/auth/img1.png",
      width: 175,
      height: 180,
      alt: "First Image",
      content: (
        <>
          <p>Hajir will help you to manage your staffs attendance, payroll,</p>
          <p>and personal reports of your company.</p>
        </>
      ),
      marginTop: "30px",
    },
    {
      src: "/auth/img2.png",
      width: 175,
      height: 180,
      alt: "Second Image",
      content: (
        <>
          <p>Candidate can login and logout on official hours</p>
          <p>and employer can notice staffs activities and generate reports.</p>
        </>
      ),
      marginTop: "30px",
    },
    {
      src: "/auth/img3.png",
      width: 175,
      height: 180,
      alt: "Third Image",
      content: (
        <>
          <p>Salary calculation made easy, track your staffs overtime,</p>
          <p>leave day, late day, and live daily wages interactive reports.</p>
        </>
      ),
      marginTop: "30px",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        objectFit: "cover",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          {!isMobile && (
            <Image
              src="/auth/login-image-default.png"
              alt="login image"
              layout="responsive"
              width={isMobile ? 300 : 900}
              height={900}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: "80px" }}>
          <Paper
            sx={{
              padding: "16px",
              textAlign: "center",
              color: "text.secondary",
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
            <div style={{ marginBottom: "16px" }}>
              <Image src="/hajir-logo.png" width={140} height={60} alt="Logo" />
            </div>
            <div>
              <h1
                style={{
                  color: "rgba(34, 64, 139, 0.87)",
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              >
                Smart attendance system
              </h1>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: images[selectedImageIndex].marginTop,
                }}
              >
                {images[selectedImageIndex].content}
              </div>
              <Image
                src={images[selectedImageIndex].src}
                width={images[selectedImageIndex].width}
                height={images[selectedImageIndex].height}
                alt={images[selectedImageIndex].alt}
                style={{ marginTop: "15px" }}
              />
            </div>
            <h1
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "40px",
              }}
            >
              Login to manage your workspace
            </h1>
            <Link href="/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, width: "250px" }}
              >
                Login
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
