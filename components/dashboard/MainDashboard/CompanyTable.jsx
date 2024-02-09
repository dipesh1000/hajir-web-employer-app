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
} from "@mui/material";
import { useDeleteCompanyMutation } from "@/services/api";
import { DeleteOutline, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useImage from "../../../hooks/useImage";

const CompanyTable = ({ companies, statusFilter }) => {
  const router = useRouter();
  const [deleteCompanyMutation] = useDeleteCompanyMutation();
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [qrCodeContent, setQrCodeContent] = useState(""); // State to hold QR code content

  const handleDeleteClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Company deleted successfully", selectedCompanyId);
      await deleteCompanyMutation(selectedCompanyId.toString());
      setConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleUpdateClick = (company) => {
    setSelectedCompanyId(company.id);
    setUpdateDialogOpen(true);
  };

  const handleUpdate = () => {
    setUpdateDialogOpen(false);
    router.push(`/dashboard/company/editcompany/${selectedCompanyId}`);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  // Function to handle QR code click and open modal with QR code content
  const handleQrCodeClick = (content) => {
    setQrCodeContent(content);
    setOpenQrCodeModal(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Employee Count</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Link href={`/dashboard/company/${company.id}`} passHref>
                    <Button color="primary">{company.name}</Button>
                  </Link>
                </TableCell>
                <TableCell>{company.employee_count}</TableCell>
                <TableCell>{company.status}</TableCell>
                <TableCell>
                  {/* UseImage component with onClick handler */}
                  {useImage({
                    src: company.qr_path,
                    height: 50,
                    width: 50,
                    style: {
                      // border: "1px solid black",
                      // borderRadius: "5px",
                    },
                    alt: "QR Code",
                    onClick: () => handleQrCodeClick(company.qr_path),
                  })}
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
      {/* QR Code Modal */}
      <Dialog open={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {/* Display QR code image */}
          {useImage({
            src: qrCodeContent,
            height: 500,
            width: 500,
            style: {
              // border: "1px solid black",
              // borderRadius: "5px",
            },
            alt: "QR Code",
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQrCodeModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
