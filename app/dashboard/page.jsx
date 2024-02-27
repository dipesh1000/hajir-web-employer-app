import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardDetailedbottom from "@/components/dashboard/DashboardDetailedButtom/DashboardDetailedbottom";
import DashboardFirstComponent from "@/components/dashboard/MainDashboard/DashboardFirstComponent";

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          // height: "100%",
          display: "flex",
          // width: "100%",
          flexDirection: "column",
          // backgroundColor: "green",
        }}
      >
        <Grid container spacing={2}>
          <Box p={3}>
            <DashboardFirstComponent />
          </Box>
        </Grid>

        <DashboardDetailedbottom />
      </Box>
    </>
  );
}
