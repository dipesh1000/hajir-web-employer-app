// MainDashboard.js
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation"; // Corrected import
import Image from "next/image";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const { companyId } = params;
  console.log(params);

  // Access companyId from the query parameters
  // const { companyId } =

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        width="350"
        height="350"
        src="/dashboard/employee/no-employee.svg"
        alt="noCompany"
      />
      <p>You havent added any employees yet?</p>
      <p>What are you waiting for? Add them now!</p>
      <StyledButton
        variant="contained"
        onClick={() =>
          router.push(`/dashboard/company/${companyId}/employee/createemployee`)
        }
        startIcon={<AddIcon />}
      >
        Create Employee
      </StyledButton>
    </Box>
  );
}
