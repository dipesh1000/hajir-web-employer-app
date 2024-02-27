"use client";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import { useParams } from "next/navigation";
import { useGetEmployerCompaniesQuery } from "@/services/api";

const DashboardDetailedbottom = () => {
  const { companyId } = useParams();
  console.log("companyId:", companyId);

  const {
    data: companyData,
    isLoading,
    refetch,
  } = useGetEmployerCompaniesQuery(companyId);
  console.log(companyData?.data?.active_companies, "active_companies");
  console.log(companyData?.data?.inactive_companies, "inactive_companies");

  const activeCompaniesLength =
    companyData?.data?.active_companies?.length || 0;
  const inactiveCompaniesLength =
    companyData?.data?.inactive_companies?.length || 0;

  const totalCompany = activeCompaniesLength + inactiveCompaniesLength;

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Stack
        container="true"
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "100%", marginTop: "10px" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <Paper
          sx={{
            backgroundColor: "rgba(34, 64, 139, 0.08)",
            height: "120px",
            padding: (theme) => theme.spacing(4),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
            Total Company
          </Typography>
          <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
            {totalCompany}
          </Typography>
        </Paper>

        <Paper
          sx={{
            backgroundColor: "rgba(34, 64, 139, 0.09)",
            height: "120px",
            padding: (theme) => theme.spacing(4),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
            Total Employee
          </Typography>
          <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
            0
          </Typography>
        </Paper>

        <Paper
          sx={{
            backgroundColor: "rgba(0, 128, 0, 0.08)",
            height: "120px",
            padding: (theme) => theme.spacing(4),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
            Active Employee
          </Typography>
          <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
            0
          </Typography>
        </Paper>

        <Paper
          sx={{
            backgroundColor: "rgba(255, 80, 80, 0.08)",
            height: "120px",
            padding: (theme) => theme.spacing(4),
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
            InActive Employee
          </Typography>
          <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
            0
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default DashboardDetailedbottom;
