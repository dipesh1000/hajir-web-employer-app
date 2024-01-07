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
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link";

const data = [
  {
    id: 1,
    name: "Company A",
    employee: 50,
    approver: 30,
    status: "Active",
    qrCode: "qr_code_data_1",
  },
  {
    id: 2,
    name: "Company B",
    employee: 30,
    approver: 20,
    status: "Inactive",
    qrCode: "qr_code_data_2",
  },
  {
    id: 3,
    name: "Company C",
    employee: 40,
    approver: 25,
    status: "Active",
    qrCode: "qr_code_data_3",
  },
];

const CompanyTable = ({ statusFilter }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setOpenEditDialog(true);
  };

  const handleInactive = () => {
    // Perform inactive/active logic here, e.g., calling an API
    console.log(
      `${
        selectedCompany?.status === "Active" ? "Inactivating" : "Activating"
      } company: ${selectedCompany?.name}`
    );
    setOpenInactiveDialog(false);
  };

  const handleDelete = () => {
    // Perform delete logic here, e.g., calling an API
    console.log(`Deleting company: ${selectedCompany?.name}`);
    setOpenDeleteDialog(false);
  };

  // Filter companies based on the statusFilter
  const filteredCompanies = data.filter((company) => {
    if (statusFilter === "active") {
      return company.status === "Active";
    } else if (statusFilter === "inactive") {
      return company.status === "Inactive";
    } else {
      return true; // "All" companies
    }
  });

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
          {selectedCompany?.status === "Active" ? "Inactivate" : "Activate"}{" "}
          Company: {selectedCompany?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {selectedCompany?.status === "Active" ? "inactivate" : "activate"}{" "}
            this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInactiveDialog(false)}>Cancel</Button>
          <Button onClick={handleInactive}>
            {selectedCompany?.status === "Active" ? "Inactivate" : "Activate"}
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
