// Import necessary dependencies
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetEmployerCompaniesQuery } from "@/services/api";
import CompanyTable from "../dashboard/MainDashboard/CompanyTable";

// Styled Button
const StyledButton = styled(Button)({
  marginTop: "40px",
  alignSelf: "center",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

// CompanyList Component
const CompanyList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();

  // State for selected tab
  const [selectedTab, setSelectedTab] = React.useState(0);

  // Change tab handler
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Assuming allCompanies, activeCompanies, and inactiveCompanies are arrays from companiesData
  const activeCompanies = companiesData?.data?.active_companies || [];
  const inactiveCompanies = companiesData?.data?.inactive_companies || [];
  const allCompanies = [...activeCompanies, ...inactiveCompanies];

  // Calculate counts for Badge components
  const totalCount = allCompanies.length;
  const activeCount = activeCompanies.length;
  const inactiveCount = inactiveCompanies.length;

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
                totalCount={totalCount}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
              />
              <Box
                sx={{
                  display: selectedTab === 0 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={allCompanies} />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 1 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={activeCompanies} />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 2 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={inactiveCompanies} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyList;
