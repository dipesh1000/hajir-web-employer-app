"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
// const StyledAppBar = styled(AppBar)({
//   backgroundColor: "#f0f0f0", // set your desired background color
// });

const StyledButton = styled(Button)({
  marginTop: "40px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

const CompanyHeader = ({ companyId }) => {
  const router = useRouter();

  return (
    // <StyledAppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        this is coming from company header
      </Typography>

      <StyledButton
        variant="contained"
        onClick={() =>
          router.push(`/dashboard/company/${companyId}/employee/createemployee`)
        }
        startIcon={<AddIcon />}
      >
        Create Employee
      </StyledButton>
    </Toolbar>
    // </StyledAppBar>
  );
};

export default CompanyHeader;

<StyledButton
  variant="contained"
  onClick={() =>
    router.push(`/dashboard/company/${companyId}/employee/createemployee`)
  }
  startIcon={<AddIcon />}
>
  Create Employee
</StyledButton>;
