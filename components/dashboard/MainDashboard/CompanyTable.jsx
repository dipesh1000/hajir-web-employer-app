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
} from "@mui/material";
import { DeleteOutline, Edit, UpdateSharp } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useImage from "../../../hooks/useImage";
import {
  useDeleteCompanyMutation,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useUpdateCompanyStatusMutation,
} from "@/services/api";

const CompanyTable = ({ companies, statusFilter }) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(companies); // Initialize filteredData state
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [
    isStatusUpdateConfirmationDialogOpen,
    setStatusUpdateConfirmationDialogOpen,
  ] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const activeCompaniesData = useGetActiveCompanyQuery();
  const activeCompanies = activeCompaniesData.data?.companies || [];
  const inactiveCompaniesData = useGetInactiveCompanyQuery();
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const [deleteCompanyMutation] = useDeleteCompanyMutation();

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

  const handleDeleteClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setDeleteConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Company deleted successfully", selectedCompanyId);
      await deleteCompanyMutation(selectedCompanyId);
      setDeleteConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(false);
    setStatusUpdateConfirmationDialogOpen(false);
  };

  const handleUpdateClick = (company) => {
    setSelectedCompanyId(company.id);
    setUpdateDialogOpen(true);
  };

  const handleUpdate = () => {
    setUpdateDialogOpen(false);
    router.push(`/dashboard/company/editcompany/${selectedCompanyId}`);
  };

  const handleUpdateStatusClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setStatusUpdateConfirmationDialogOpen(true);
  };

  const handleConfirmStatusUpdate = async () => {
    try {
      const newStatus = "inactive";
      await updateCompanyStatus({
        company_id: selectedCompanyId,
        status: newStatus,
      });
      setStatusUpdateConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error updating company status:", error);
    }
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
              <TableCell>Company Name</TableCell>
              <TableCell>Employee Count</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
      <Dialog
        open={isDeleteConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isStatusUpdateConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Status Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusUpdate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
