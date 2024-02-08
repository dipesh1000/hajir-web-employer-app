// Import the necessary dependencies
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import {
  useGetActiveCompanyQuery,
  useGetEmployerCompaniesQuery,
  useGetInactiveCompanyQuery,
} from "@/services/api";

const CompanyTable = ({ statusFilter }) => {
  // Use the custom hooks to fetch data
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();
  const { data: activeCompaniesData, isLoading: activeLoading } =
    useGetActiveCompanyQuery();
  const { data: inactiveCompaniesData, isLoading: inactiveLoading } =
    useGetInactiveCompanyQuery();

  // Assuming companiesData is an array of companies, modify the structure accordingly
  const allCompanies = companiesData?.data || [];

  // Assuming activeCompaniesData and inactiveCompaniesData are arrays of companies, modify the structure accordingly
  // const activeCompanies = activeCompaniesData?.data?.active_companies || [];
  // const inactiveCompanies =
  //   inactiveCompaniesData?.data?.inactive_companies || [];

  // Define filteredCompanies here
  // let filteredCompanies = [];

  // if (statusFilter === "active") {
  //   filteredCompanies = activeCompanies;
  // } else if (statusFilter === "inactive") {
  //   filteredCompanies = inactiveCompanies;
  // } else {
  //   // "All" companies
  //   filteredCompanies = allCompanies;
  // }

  // Ensure filteredCompanies is always an array
  // filteredCompanies = Array.isArray(filteredCompanies)
  //   ? filteredCompanies
  //   : [filteredCompanies];

  // console.log("All Companies:", allCompanies);
  // console.log("Status Filter:", statusFilter);
  // console.log("Filtered Companies:", filteredCompanies);
  // console.log("from api endpoint", activeCompaniesData);
  // console.log("from api endpoint", activeCompaniesData);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Approver</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.employee_count}</TableCell>
                <TableCell>{company.id}</TableCell>
                <TableCell>
                  <span
                    style={{
                      background:
                        company.status === "active" ? "#00800033" : "#FF505033",
                      color: company.status === "inactive" ? "red" : "green",
                      padding: "7px",
                      borderRadius: "4px",
                    }}
                  >
                    {company.status}
                  </span>
                </TableCell>
                <TableCell>{company.qr_path}</TableCell>
                <TableCell>
                  <IconButton></IconButton>
                  <IconButton</IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyTable;
