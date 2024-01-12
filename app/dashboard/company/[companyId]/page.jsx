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

const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

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

          <Box>
            <StyledButton
              variant="contained"
              onClick={() => router.push("/dashboard/company/createemployee")}
              startIcon={<AddIcon />}
            >
              Create Company
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
