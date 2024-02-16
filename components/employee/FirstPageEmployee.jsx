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
    refetch();
    setSelectedTab(newValue);
  };

  const activeEmployee = candidateData?.data?.active_candidates || [];
  const inactiveEmployee = candidateData?.data?.inactive_candidates || [];
  const allEmployee = [...activeEmployee, ...inactiveEmployee];

  const totalCountEmployee = allEmployee.length;
  const activeCountEmployee = activeEmployee.length;
  const inactiveCountEmployee = inactiveEmployee.length;

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
                totalCount={totalCountEmployee}
                activeCount={activeCountEmployee}
                inactiveCount={inactiveCountEmployee}
              />
              <Box
                sx={{
                  display: selectedTab === 0 ? "block" : "none",
                  height: "100%",
                }}
              >
                <EmployeeTable
                  candidateData={candidateData}
                  // statusFilter={allEmployee}
                />{" "}
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
