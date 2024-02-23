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
import { DeleteOutline, Edit, MoreVert, UpdateSharp } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useImage from "../../../hooks/useImage";
import {
  useDeleteCompanyMutation,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useUpdateCompanyStatusMutation,
  useGenerateQrCodeQuery,
} from "@/services/api";

const CompanyTable = ({ companies, statusFilter }) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(companies);
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
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const [deleteCompanyMutation] = useDeleteCompanyMutation();
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [qrCodeContent, setQrCodeContent] = useState("");
  const [companyIdForQrCode, setCompanyIdForQrCode] = useState(null);
  const generateQrCode = useGenerateQrCodeQuery(); // This line initializes the hook

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

  const handleQrCodeClick = (content) => {
    setQrCodeContent(content);
    setOpenQrCodeModal(true);
  };
  const generateQrCodeClick = (companyId) => {
    setCompanyIdForQrCode(companyId); // Set the companyIdForQrCode
    setOpenQrCodeModal(true); // Open the QR code modal
  };

  const generateNewQrCode = async () => {
    console.log("Generating new QR code for company:", companyIdForQrCode);

    try {
      // Fetch QR code data using useGenerateQrCodeQuery
      const response = await generateQrCode(companyIdForQrCode);

      // Check if the response is successful
      if (response.data) {
        // Handle the response data here, maybe set it to state or display it
      } else {
        console.error("Error: Invalid QR code response");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
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
              <TableCell>QR Code</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <TableRow key={company.id} sx={{ borderBottom: '0.7px dotted #ccc'}}>
                    <TableCell>
                      <Link href={`/dashboard/company/${company.id}`} passHref>
                        <Button color="primary">{company.name}</Button>
                      </Link>
                    </TableCell>
                    <TableCell>{company.employee_count}</TableCell>
                    <TableCell
                        sx={{
                      backgroundColor: company.status === "active" ? "#FF505033" : "#00800033",
                      color: company.status === "active" ? "red" : "green",
                      padding: "7px",
                      borderRadius: "4px",
                      marginTop:'20px',
                      textAlign:'center',
                      justifyContent:'center',
                      marginRight:'10px',
                                            height: "34px", 
                      display: "flex", 
                      alignItems: "center",
                     
                   
                      }}>
                    {company.status}
                    </TableCell>
                    <TableCell>
                      {useImage({
                        src: company.qr_path,
                        height: 50,
                        width: 50,
                        style: {},
                        alt: "QR Code",
                        onClick: () => handleQrCodeClick(company.qr_path),
                      })}
                    </TableCell>
                    <TableCell>
                      {/* <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(company.id)}
                      >
                        <DeleteOutline />
                      </IconButton> */}
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
                      <MoreVert></MoreVert>
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
      {/* Delete Confirmation Dialog */}
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
      {/* Update Dialog */}
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
      {/* Status Update Confirmation Dialog */}
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
      {/* QR Code Modal */}
      <Dialog open={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {/* Display QR code image */}
          <Button onClick={generateNewQrCode}>
            <Typography
              sx={{
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 500,
              }}
            >
              Generate New QR Code
            </Typography>
          </Button>{" "}
          {useImage({
            src: qrCodeContent,
            height: 250,
            width: 250,
            style: {
              margin: "auto",
            },
            alt: "QR Code",
          })}
          {/* Display company name */}
          <Typography variant="body2">Name:</Typography>
          {/* Share button to download the QR code image as PDF */}
          <Button onClick={() => downloadQrCodeAsPdf()}>
            <Typography variant="body2">Share</Typography>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQrCodeModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
