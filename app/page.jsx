"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImageSlider from "@/components/Auth/ImageSlider";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";

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

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ImageSlider />
        </Grid>
        <Grid item xs={6}>
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
              <Image
                src="/auth/sign-min.png"
                width={140}
                height={120}
                alt="Logo"
              />
            </div>
            <Link href="/signin">
              {" "}
              <Button variant="contained" color="primary">
                {" "}
                Login
              </Button>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
