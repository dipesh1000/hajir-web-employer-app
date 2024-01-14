// MainDashboard.js
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Image from "next/image";

const StyledButton = styled(Button)({
  marginTop: "40px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2d3b55",
  },
});

export default function FirstPageEmployee() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh", // This ensures the Box takes the full height of the viewport
      }}
    >
      <Image
        width="350"
        height="350"
        src="/dashboard/employee/no-employee.svg"
        alt="noCompany"
      />
      <p>You havent add employee yet?</p>
      <p>What are you waiting for? add it now!</p>
      <StyledButton
        variant="contained"
        onClick={() => router.push("/dashboard/company/createcompany")}
        startIcon={<AddIcon />}
      >
        Create Employee
      </StyledButton>
    </Box>
  );
}
