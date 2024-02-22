"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TablePagination,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit, UpdateSharp } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAttendanceReportTodayQuery } from "@/services/api";
import { useParams } from "next/navigation";

const AttendaceTable = ({ companies, statusFilter }) => {
  const { companyId } = useParams();

  const router = useRouter();
  const [filteredData, setFilteredData] = useState(companies);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    data: getAttendaceReportToday,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useGetAttendanceReportTodayQuery(companyId);
  // const activeCompanies = activeCompaniesData.data?.companies || [];
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text);
  };

  const filterData = (searchText) => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchText)
    );
    setFilteredData(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1000, mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Employee Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <FormControl variant="outlined" size="small" sx={{ ml: 2, width: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select label="Department" autoWidth={false}>
            <MenuItem value="">All Departments</MenuItem>
          </Select>
        </FormControl>
        <br />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate Id</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>CLock In</TableCell>
              <TableCell>ClOCK out </TableCell>
              <TableCell>Attendace</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Link href={`/dashboard/company/${company.id}`} passHref>
                        <Button color="primary">{company.name}</Button>
                      </Link>
                    </TableCell>
                    <TableCell>{company.employee_count}</TableCell>
                    <TableCell>
                      {activeCompanies.some(
                        (activeCompany) => activeCompany.id === company.id
                      )
                        ? "Active"
                        : "Inactive"}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(company.id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleUpdateClick(company)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="status"
                        onClick={() => handleUpdateStatusClick(company.id)}
                      >
                        <UpdateSharp />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AttendaceTable;
