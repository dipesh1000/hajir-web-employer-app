import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";

const ActivityReportHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box>
        <Typography variant="h5">Velox lab</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          velox lab private limited
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <IconButton color="primary" aria-label="Download PDF">
          <GetAppIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Share">
          <ShareIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ActivityReportHeader;
