// MainDashboard.js
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardFirstComponent from "./MainDashboard/DashboardFirstComponent";
import DashboardSecondComponent from "./MainDashboard/DashboardSecondComponent";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "100vh",
  display: "flex",
  // width: "100vw",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
}));

const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

export default function FirstDashboard() {
  const router = useRouter();

  return (
    <StyledBox>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box p={3}>
            <DashboardFirstComponent />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box p={3}>
            <DashboardSecondComponent />
          </Box>
        </Grid>
      </Grid>
      {/* <StyledButton
        variant="contained"
        onClick={() => router.push("/dashboard/company/createcompany")}
        startIcon={<AddIcon />}
      >
        Create Company
      </StyledButton> */}
    </StyledBox>
  );
}
