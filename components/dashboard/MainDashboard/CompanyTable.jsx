"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link";
import TablePagination from "@mui/material/TablePagination";
import { deleteCompany, toggleActiveState } from "@/redux/companySlice";

const CompanyTable = ({ companies, statusFilter }) => {
  const dispatch = useDispatch();
  // const companies = useSelector((state) => state.company.companies);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setOpenEditDialog(true);
  };

  const handleInactive = () => {
    setOpenInactiveDialog(true);
  };

  const handleStatusConfirm = () => {
    if (selectedCompany?.status === "active") {
      dispatch(toggleActiveState(selectedCompany?.id));
    } else {
      dispatch(toggleActiveState(selectedCompany?.id));
    }
    setOpenInactiveDialog(false);
  };

  const handleDelete = () => {
    console.log("Deleting Company with ID:", companyIdToDelete);
    dispatch(deleteCompany(companyIdToDelete));
    setOpenDeleteDialog(false);
  };

  const filteredCompanies = companies.filter((company) => {
    if (statusFilter === "active") {
      return company.status === "active";
    } else if (statusFilter === "inactive") {
      return company.status === "inactive";
    } else {
      return true; // "All" companies
    }
  });
  // Pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const paginatedCompanies = filteredCompanies.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box>
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
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Link href={`/dashboard/company/${company.id}`} passHref>
                    <Button color="primary">{company.name}</Button>
                  </Link>
                </TableCell>
                <TableCell>{company.employee}</TableCell>
                <TableCell>{company.approver}</TableCell>
                <TableCell>{company.status}</TableCell>
                <TableCell>{company.qrCode}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(company)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleInactive()}>
                    {company.status === "active" ? (
                      <BlockIcon />
                    ) : (
                      <CheckIcon />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setCompanyIdToDelete(company.id);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredCompanies.length} // Use the total number of filtered companies
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // Explicitly set the language to English (United States)
        locale="en-US"
      />
      {/* Inactive Dialog */}
      <Dialog
        open={openInactiveDialog}
        onClose={() => setOpenInactiveDialog(false)}
      >
        {/* ... (Inactive Dialog content) */}
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
