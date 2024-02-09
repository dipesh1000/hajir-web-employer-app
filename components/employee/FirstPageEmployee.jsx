// FirstPageEmployee.js

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useGetCandidatesQuery } from "@/services/api";
import TabsActiveInactive from "../dashboard/MainDashboard/TabsActiveInactive";
import EmployeeTable from "./employeetable.jsx/EmployeeTable";

const FirstPageEmployee = () => {
  const router = useRouter();
  const { companyId } = useParams();

  const {
    data: candidateData,
    isLoading,
    refetch,
  } = useGetCandidatesQuery(companyId);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    refetch();
  };

  return (
    <>
      <Box>
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
                <h2>Employee</h2>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() =>
                    router.push(
                      `/dashboard/company/${companyId}/employee/createemployee`
                    )
                  }
                  startIcon={<AddIcon />}
                >
                  Create Employee
                </Button>
              </Box>
            </Box>
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
                <EmployeeTable candidateData={candidateData} />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 1 ? "block" : "none",
                  height: "100%",
                }}
              >
                <EmployeeTable
                  candidateData={candidateData}
                  statusFilter="active"
                />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 2 ? "block" : "none",
                  height: "100%",
                }}
              >
                <EmployeeTable
                  candidateData={candidateData}
                  statusFilter="inactive"
                />
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
