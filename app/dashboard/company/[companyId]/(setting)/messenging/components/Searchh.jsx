
"use client"
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  border: "1px solid black",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.85),
  },
  marginRight: theme.spacing(2),
  marginLeft: "4px",
  width: "250px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Searchh = () => (
  <SearchContainer>
    <SearchIconWrapper>
      <SearchIcon style={{ color: "#0000A0" }} />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Employee Name…"
      inputProps={{ "aria-label": "search" }}
    />
  </SearchContainer>
);

export default Searchh;
