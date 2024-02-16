"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import DashboardDetailedbottom from "@/components/dashboard/DashboardDetailedButtom/DashboardDetailedbottom";
import DashboardFirstComponent from "@/components/dashboard/MainDashboard/DashboardFirstComponent";
const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
}));

export default function HomePage() {
  return (
    <>
      <StyledBox>
        <Grid spacing={2}>
          {/* <Grid item xs={7}> */}
          <Box p={3}>
            <DashboardFirstComponent />
          </Box>
          {/* </Grid> */}
        </Grid>

        <DashboardDetailedbottom />
      </StyledBox>
    </>
  );
}