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
      <Item sx={{ backgroundColor: "#0080000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          75
        </Typography>
        <Typography variant="body1">Attended</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FF00000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          5
        </Typography>
        <Typography variant="body1">Absent</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          10
        </Typography>
        <Typography variant="body1">Late</Typography>
      </Item>
    </Stack>
  );
};

export default HeaderAttendance;
