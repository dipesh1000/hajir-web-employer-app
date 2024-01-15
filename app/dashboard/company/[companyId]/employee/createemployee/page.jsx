// MainDashboard.js
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
import CompanyTable from "@/components/dashboard/MainDashboard/CompanyTable";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function CreateEmployee() {
  const router = useRouter();
  const params = useParams();
  const { companyId } = params;
  console.log(params);

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
        <Grid item xs={8}>
          <h2>Company hello</h2>
          <p>{companyId}</p>
          <h4>Dashboard / Company</h4>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
}
