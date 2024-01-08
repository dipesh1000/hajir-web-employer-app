// MainDashboard.js
"use client";
// MainDashboard.js
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

  const handleAddCompany = () => {
    // For simplicity, I'm using a static company object. You should get this data from your form.
    const newCompany = {
      id: companies.length + 1,
      name: "New Company",
      employee: 0,
      approver: 0,
      status: "active",
      qrCode: "qr_code_data_" + (companies.length + 1),
    };

    dispatch(addCompany(newCompany));
  };

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
          <h2>Company</h2>

          <h4>Dashboard / Company</h4>
          <Box>
            <TabsActiveInactive
              value={selectedTab}
              handleChange={handleChangeTab}
              sx={{ gap: 50 }} // Adjust the gap value as needed
              notificationsCount={{ all: 5, active: 2, inactive: 3 }}
            />
            <Box sx={{ display: selectedTab === 0 ? "block" : "none" }}>
              {/* All Companies */}
              <CompanyTable companies={companies} />
            </Box>
            <Box sx={{ display: selectedTab === 1 ? "block" : "none" }}>
              {/* Active Companies */}
              <CompanyTable companies={companies} statusFilter="active" />
            </Box>
            <Box sx={{ display: selectedTab === 2 ? "block" : "none" }}>
              {/* Inactive Companies */}
              <CompanyTable companies={companies} statusFilter="inactive" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <StyledButton
              variant="contained"
              onClick={handleAddCompany}
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
