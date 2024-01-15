"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Link from "next/link";

// const StyledAppBar = styled(AppBar)({
//   backgroundColor: "#f0f0f0", // set your desired background color
// });

const StyledButton = styled(Button)({
  flexGrow: 1,
  width: "100%",
  color: "blue",
  "&:not(:last-child)": {
    marginRight: "8px", // Set the desired space between buttons
  },
});

const CompanyHeader = ({ companyId }) => {
  return (
    // <StyledAppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        this is coming from company header
      </Typography>
    </Toolbar>
    // </StyledAppBar>
  );
};

export default CompanyHeader;
