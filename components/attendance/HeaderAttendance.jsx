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
}));

const HeaderAttendance = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ width: "100%" }}
      spacing={{ xs: 1, sm: 2, md: 12 }}
    >
      <Item sx={{ backgroundColor: "#90EE90 " }}>
        <Typography sx={{ color: "#FF0000" }} variant="h5">
          75
        </Typography>
        <Typography variant="h6">Attended</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FFC0CB " }}>
        <Typography sx={{ color: "#FF0000" }} variant="h5">
          5
        </Typography>
        <Typography variant="h6">Absent</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FFFFE0 " }}>
        <Typography sx={{ color: "#FF0000" }} variant="h5">
          10
        </Typography>
        <Typography variant="h6">Late</Typography>
      </Item>
    </Stack>
  );
};

export default HeaderAttendance;
