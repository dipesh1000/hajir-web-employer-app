"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import FirstPageEmployee from "@/components/employee/FirstPageEmployee";

export default function MainDashboard() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies) || [];
  const hasCompanies = companies.length > 0;

  return (
    <div
      sx={
        {
          // width: "100vw",
          // height: "100vh",
        }
      }
    >
      {/* {hasCompanies ? <CompanyFormFirst /> : <FirstPageEmployee />} */}
    </div>
  );
}
