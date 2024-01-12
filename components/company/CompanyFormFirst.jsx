"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
import CompanyTable from "@/components/dashboard/MainDashboard/CompanyTable";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

const CompanyFormFirst = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies) || [];
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box
        sx={
          {
            //   flexGrow: 3,
            //   width: "100vw",
            //   height: "100vh",
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "start",
            //   margin: 0,
            //   padding: 0,
            //   marginBottom: "1rem", // Add margin bottom for better spacing
          }
        }
      >
        <Grid
          container
          spacing={5}
          columns={1}
          sx={{ width: "100%", height: "100%" }}
        >
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <h2>Company</h2>
              </Box>
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
            </Box>
            <h4>
              <span>Dashboard</span> / <span>Company</span>
            </h4>
            <Box sx={{ flexGrow: 1 }}>
              <TabsActiveInactive
                value={selectedTab}
                handleChange={handleChangeTab}
                sx={{ gap: 50 }}
                notificationsCount={{ all: 5, active: 2, inactive: 3 }}
              />
              <Box
                sx={{
                  display: selectedTab === 0 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={companies} />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 1 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={companies} statusFilter="active" />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 2 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={companies} statusFilter="inactive" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyFormFirst;
