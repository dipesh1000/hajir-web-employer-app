"use client";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100vh", // Set the height to 100% of the viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
 marginTop:"30px"
}));

const DashboardDetailedbottom = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ width: "100%", marginTop:"70px" }}
      spacing={{ xs: 1, sm: 2, md: 12 }}
    >
      <Item sx={{  backgroundColor: 'rgba(34, 64, 139, 0.08)',height:"150px"}}>
    
        <Typography variant="body1"  sx={{color: "black",fontSize:"20px"}}>Total Company</Typography>
        <Typography sx={{ color: "#22408B", fontSize:"28px"}} variant="h6">
        0
        </Typography>
      </Item>

      <Item sx={{ backgroundColor: 'rgba(34, 64, 139, 0.09)' }}>
  
        <Typography variant="body1" sx={{color: "black", fontSize:"20px"}}>Total Employee</Typography>
        <Typography sx={{ color: "#22408B", fontSize:"28px"}} variant="h6">
          0
        </Typography>
      </Item>

      <Item sx={{   backgroundColor: 'rgba(0, 128, 0, 0.08)' }}>
    
        <Typography variant="body1" sx={{color: "black", fontSize:"20px"}}>Active Employee</Typography>
        <Typography sx={{ color: "#22408B", fontSize:"28px" }} variant="h6">
          0
        </Typography>
      </Item>
      <Item sx={{  backgroundColor: 'rgba(255, 80, 80, 0.08)',


}}>
      
        <Typography variant="body1" sx={{color: "black", fontSize:"20px"}}>InActive Employee</Typography>
        <Typography sx={{ color: "#22408B", fontSize:"28px" }} variant="h6">
          0
        </Typography>
      </Item>
    </Stack>
  );
};

export default DashboardDetailedbottom;
