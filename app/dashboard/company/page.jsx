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
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "@/redux/companySlice";
import FirstPageCompany from "@/components/company/FirstPageCompany";

const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

export default function MainDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies) || [];
  const hasCompanies = companies.length > 0;

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      {hasCompanies ? (
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
              <h2>Employee</h2>
              <Box>
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    router.push("/dashboard/company/createcompany")
                  }
                  startIcon={<AddIcon />}
                >
                  Create Company
                </StyledButton>
              </Box>
              <h4>Dashboard / Company</h4>
              <Box>
                <TabsActiveInactive
                  value={selectedTab}
                  handleChange={handleChangeTab}
                  sx={{ gap: 50 }}
                  notificationsCount={{ all: 5, active: 2, inactive: 3 }}
                />
                <Box sx={{ display: selectedTab === 0 ? "block" : "none" }}>
                  <CompanyTable companies={companies} />
                </Box>
                <Box sx={{ display: selectedTab === 1 ? "block" : "none" }}>
                  <CompanyTable companies={companies} statusFilter="active" />
                </Box>
                <Box sx={{ display: selectedTab === 2 ? "block" : "none" }}>
                  <CompanyTable companies={companies} statusFilter="inactive" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      ) : (
        <FirstPageCompany />
      )}
    </>
  );
}
