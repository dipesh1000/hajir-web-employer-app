"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
// import CompanyTable from "@/components/dashboard/MainDashboard/CompanyTable";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "./employeetable.jsx/EmployeeTable";
import { FirstPage } from "@mui/icons-material";
import { useGetCandidatesQuery } from "@/services/api";
import TabsActiveInactive from "../dashboard/MainDashboard/TabsActiveInactive";

const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

const FirstPageEmployee = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const getCandidates = useGetCandidatesQuery();
  console.log(getCandidates, "getCandidates");

  // const companies = useSelector((state) => state.company.companies) || [];
  // const employees = useSelector((state) => state.company.employees) || [];
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
                <h2>Emplpoyee</h2>
              </Box>
              <Box>
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    router.push(
                      `/dashboard/company/${companyId}/employee/createemployee`
                    )
                  }
                  startIcon={<AddIcon />}
                >
                  Create Employee
                </StyledButton>
              </Box>
            </Box>
            {/* <EmployeeTable/> */}
            <h4>
              <span>Dashboard</span> / <span>Company</span> /{" "}
              <span>Employee</span>
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
                {/* <EmployeeTable employees={employees} /> */}
              </Box>
              <Box
                sx={{
                  display: selectedTab === 1 ? "block" : "none",
                  height: "100%",
                }}
              >
                {/* <EmployeeTable employees={employees} statusFilter="active" /> */}
              </Box>
              <Box
                sx={{
                  display: selectedTab === 2 ? "block" : "none",
                  height: "100%",
                }}
              >
                {/* <EmployeeTable employees={employees} statusFilter="inactive" /> */}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FirstPageEmployee;
