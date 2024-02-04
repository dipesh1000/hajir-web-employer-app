"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link";
import { toggleActiveState, deleteCompany } from "@/redux/companySlice";
import EditCompanyForm from "@/components/company/EditCompanyForm";
import { useRouter } from "next/navigation";
import {
  useGetEmployerCompaniesQuery,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
} from "@/services/api";

const CompanyTable = ({ companies, statusFilter = {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();





  const activeCompanies = companiesData?.data?.active_companies || [];
  const inactiveCompanies = companiesData?.data?.inactive_companies || [];
  const allCompanies = [...activeCompanies, ...inactiveCompanies];
  console.log(allCompanies);
  console.log(statusFilter);
  console.log(activeCompanies);
  console.log(inactiveCompanies);


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
          <TableBody>
            {filteredCompanies.map((companies) => (
            <TableRow>
              <TableRow key={companies.id}>

              <TableCell>{allCompanies.id}</TableCell>
              <TableCell>{companies.approver}</TableCell>


            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
};

export default CompanyTable;
