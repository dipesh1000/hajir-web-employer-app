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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";

const data = [
  { id: 1, name: "Company A", members: 50, status: "Active" },
  { id: 2, name: "Company B", members: 30, status: "Inactive" },
  // Add more companies as needed
];

const CompanyTable = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setOpenEditDialog(true);
  };

  const handleInactive = (company) => {
    setSelectedCompany(company);
    setOpenInactiveDialog(true);
  };

  const handleDelete = () => {
    // Perform delete logic here
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.members}</TableCell>
                <TableCell>{company.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(company)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleInactive(company)}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenEditDialog(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Inactive Dialog */}
      <Dialog
        open={openInactiveDialog}
        onClose={() => setOpenInactiveDialog(false)}
      >
        <DialogTitle>Inactive Company: {selectedCompany?.name}</DialogTitle>
        <DialogContent>
          {/* Add your inactive confirmation content here */}
          <DialogContentText>
            Are you sure you want to inactive this company?
          </DialogContentText>
          <Button onClick={() => setOpenDeleteDialog(true)}>
            Delete Company
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInactiveDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenInactiveDialog(false)}>Inactive</Button>
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
    </>
  );
};

export default CompanyTable;
