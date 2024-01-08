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
  const companies = [
    {
      id: 1,
      name: "Company A",
      employee: 20,
      approver: 10,
      status: "active",
      qrCode: "qr_code_data_1",
    },
    // Add more companies as needed
  ];
  const handleEdit = (companyId) => {
    // Implement edit logic
    console.log(`Editing company with ID: ${companyId}`);
  };

  const handleDelete = (companyId) => {
    // Implement delete logic
    console.log(`Deleting company with ID: ${companyId}`);
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
              <CompanyTable
                companies={companies}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>
            <Box sx={{ display: selectedTab === 1 ? "block" : "none" }}>
              {/* Active Companies */}
              <CompanyTable statusFilter="active" />
            </Box>
            <Box sx={{ display: selectedTab === 2 ? "block" : "none" }}>
              {/* Inactive Companies */}
              <CompanyTable statusFilter="inactive" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <StyledButton
              variant="contained"
              onClick={() => router.push("/dashboard/company/createcompany")}
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
