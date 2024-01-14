// MainDashboard.js
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
import CompanyTable from "@/components/dashboard/MainDashboard/CompanyTable";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import CompanyHeader from "@/components/Sidebar/CompanyHeader/CompanyHeader";

export default function MainDashboard(params) {
  console.log(params);
  const router = useRouter();

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={4}>
          {/* <CompanyHeader /> */}
          hello
          <Box></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
