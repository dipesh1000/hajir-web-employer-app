"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  useDeleteCompanyMutation,
  useGetActiveCompanyQuery,
  useGetEmployerCompaniesQuery,
  useGetInactiveCompanyQuery,
} from "@/services/api";
import { DeleteOutline, Edit } from "@mui/icons-material";
import Link from "next/link";

// Import statements

const CompanyTable = ({ statusFilter }) => {
  const router = useRouter();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();
  const deleteCompanyMutation = useDeleteCompanyMutation();

  const companyData =
    companiesData?.data?.active_companies?.concat(
      companiesData?.data?.inactive_companies
    ) || [];

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
    React.useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDeleteClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(selectedCompanyId, "deleted");
      await deleteCompanyMutation.mutateAsync(selectedCompanyId);
      setConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleUpdateClick = (company) => {
    setSelectedCompanyId(company.id);
    // Additional logic for handling company data if needed
    setUpdateDialogOpen(true);
  };

  const handleUpdate = () => {
    setUpdateDialogOpen(false);
    router.push(`/dashboard/company/editcompany/${selectedCompanyId}`);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Employee Count</TableCell>
              <TableCell>Approver</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData &&
              companyData.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Link href={`/dashboard/company/${company.id}`} passHref>
                      <Button color="primary">{company.name}</Button>
                    </Link>
                  </TableCell>
                  <TableCell>{company.employee_count}</TableCell>
                  <TableCell>need from backend</TableCell>
                  <TableCell>{company.created_at}</TableCell>
                  <TableCell>{company.qr_path}</TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
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

      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this company?
          </DialogContentText>
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
