"use client";
// company table// company table// CompanyTable.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link";
import { deleteCompany, toggleActiveState } from "@/redux/companySlice";

const CompanyTable = ({ companies, statusFilter }) => {
  const dispatch = useDispatch();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setOpenEditDialog(true);
  };

  const handleInactive = () => {
    dispatch(toggleActiveState(selectedCompany.id));
    setOpenInactiveDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteCompany(selectedCompany.id));
    setOpenDeleteDialog(false);
  };

  // Filter companies based on the statusFilter
  const filteredCompanies =
    statusFilter !== undefined
      ? companies.filter((company) => company.status === statusFilter)
      : companies;

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
                    <Button component="a" color="primary">
                      {company.name}
                    </Button>
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
                  <IconButton onClick={() => setOpenInactiveDialog(true)}>
                    <BlockIcon />
                  </IconButton>
                  <IconButton onClick={() => setOpenDeleteDialog(true)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Company: {selectedCompany?.name}</DialogTitle>
        <DialogContent>
          {/* Add your edit form or content here */}
          <Link href={`/editpage/${selectedCompany?.id}`} passHref>
            <Button component="a">Edit Company</Button>
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          {/* Remove the following button if not needed */}
          <Button onClick={() => setOpenEditDialog(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Inactive Dialog */}
      <Dialog
        open={openInactiveDialog}
        onClose={() => setOpenInactiveDialog(false)}
      >
        <DialogTitle>
          {selectedCompany?.status === "active" ? "Inactivate" : "Activate"}{" "}
          Company: {selectedCompany?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {selectedCompany?.status === "active" ? "inactivate" : "activate"}{" "}
            this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInactiveDialog(false)}>Cancel</Button>
          <Button onClick={handleInactive}>
            {selectedCompany?.status === "active" ? "Inactivate" : "Activate"}
          </Button>
        </DialogActions>
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
