"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
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

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* image showing grid  */}
      <Grid container sx={{ height: "100vh" }}>
        {/* testing  */}
        <Grid item xs={12} md={6}>
          {/* Always render ImageSlider */}
          <Image
            width={750}
            height={750}
            alt="login image"
            src="/auth/login-image-default.png"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </LogoContainer>
            <div>
              <h2>Login Here</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                Hajir will help you to manage your staff’s attendance,
                <br />
                payroll and personal report of your company.
              </p>
              {/* Always render the image */}
              <Image
                src="/auth/sign-min.png"
                width={140}
                height={120}
                alt="Logo"
              />
            </div>
            <Link href="/login">
              {/* make button width little bigger */}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 5, width: "120px" }}
              >
                Login
              </Button>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
