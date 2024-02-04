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
import { useGetEmployerCompaniesQuery ,useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,} from "@/services/api";

const CompanyTable = ({ companies, statusFilter = {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();
  const { , isLoading } = useGetActiveCompanyQuery();
  const {  , isLoading } = useGetInactiveCompanyQuery();

  // const [selectedCompanyToEdit, setSelectedCompanyToEdit] = useState(null);
  // const [selectedCompany, setSelectedCompany] = useState(null);
  // const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  // const [openEditConfirmationDialog, setOpenEditConfirmationDialog] =
  //   useState(false);
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);

  // // New state for QR Code modal
  // const [openQrCodeModal, setOpenQrCodeModal] = React.useState(false);
  // const [qrCodeContent, setQrCodeContent] = React.useState("");

  // const handleEdit = (company) => {
  //   setSelectedCompanyToEdit(company.id);
  //   setOpenEditConfirmationDialog(true);
  // };

  // const handleEditConfirmation = () => {
  //   setOpenEditConfirmationDialog(false);
  //   router.push(`/dashboard/company/editcompany/${selectedCompanyToEdit}`);
  // };

  // const handleEditCancel = () => {
  //   setSelectedCompanyToEdit(null);
  //   setOpenEditConfirmationDialog(false);
  // };

  // const handleUpdate = (updatedCompany) => {
  // Dispatch the action to update the company in the Redux store
  // dispatch(updatedCompany(updatedCompany));

  // Close the editing modal
  //   setOpenEditModal(false);
  // };

  // Function to handle opening QR Code modal
  // const handleQrCodeClick = (content) => {
  //   setQrCodeContent(content);
  //   setOpenQrCodeModal(true);
  // };
  // const handleStatusChange = (company) => {
  //   setSelectedCompany(company);
  //   setOpenStatusChangeDialog(true);
  // };

  // const handleStatusConfirm = (newStatus) => {
  //   if (selectedCompany) {
  //     dispatch(toggleActiveState(selectedCompany.id));
  //   }
  //   setOpenStatusChangeDialog(false);
  // };

  // const handleDelete = () => {
  //   console.log("Deleting Company with ID:", companyIdToDelete);
  //   dispatch(deleteCompany(companyIdToDelete));
  //   setOpenDeleteDialog(false);
  // };
  const activeCompanies = companiesData?.data?.active_companies || [];
  const inactiveCompanies = companiesData?.data?.inactive_companies || [];
  const allCompanies = [...activeCompanies, ...inactiveCompanies];
  console.log(allCompanies);
  console.log(statusFilter);
  console.log(activeCompanies);
  console.log(inactiveCompanies);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   dispatch(changePage(newPage));
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  // };

  // let paginatedCompanies = [];

  // if (pagination && pagination.currentPage && pagination.rowsPerPage) {
  //   const startIndex = (pagination.currentPage - 1) * pagination.rowsPerPage;
  //   const endIndex = startIndex + pagination.rowsPerPage;
  //   paginatedCompanies = companies.slice(startIndex, endIndex);
  // } else {
  //   console.error("Invalid pagination object:", pagination);
  // }

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
            {/* {filteredCompanies.map((companies) => ( */}
            {/* <TableRow key={companies.id}> */}
              {/* <TableCell> */}
                {/* <Link href={`/dashboard/company/${company.id}`} passHref> */}
                {/* <Button color="primary">{companies.name}</Button> */}
                {/* </Link> */}
              {/* </TableCell> */}
              <TableCell>{allCompanies.id}</TableCell>
              <TableCell>{companies.approver}</TableCell>
              {/* <TableCell>
                  <span
                    style={{
                      background:
                        company.status === "active" ? "#00800033" : "#FF505033",
                      color: company.status === "inactive" ? "red" : "green",
                      padding: "7px",
                      borderRadius: "4px",
                    }}
                  >
                    {company.status}
                  </span>
                </TableCell> */}
              {/* <TableCell onClick={() => handleQrCodeClick(company.qrcode)}>
                  {company.qrcode}
                </TableCell> */}
              {/* <TableCell>
                  {company.status === "active" ? (
                    <>
                      <IconButton onClick={() => handleEdit(company)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleStatusChange(company)}>
                        <Tooltip title="Make Inactive">
                          <BlockIcon />
                        </Tooltip>
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => {
                          setCompanyIdToDelete(company.id);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleStatusChange(company)}>
                        <Tooltip title="Make Active">
                          <CheckIcon />
                        </Tooltip>
                      </IconButton>
                    </>
                  )}
                </TableCell> */}
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Dialog open={openEditConfirmationDialog} onClose={handleEditCancel}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to edit this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditConfirmation}>Yes, Edit</Button>
        </DialogActions>
      </Dialog> */}

      {/* <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <EditCompanyForm
            companyIdToEdit={selectedCompanyToEdit}
            onClose={() => setOpenEditModal(false)}
            onUpdate={(updatedData) => handleUpdate(updatedData)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog> */}

      {/* <Dialog
        open={openStatusChangeDialog}
        onClose={() => setOpenStatusChangeDialog(false)}
      >
        <DialogTitle>
          {selectedCompany?.status === "active"
            ? "Are you sure?"
            : "Do you want to make this company active?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedCompany?.status === "active"
              ? "Are you sure you want to make this company inactive?"
              : "Are you sure you want to make this company active?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusChangeDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleStatusConfirm()}>
            {selectedCompany?.status === "active"
              ? "Make Inactive"
              : "Make Active"}
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* <Dialog
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
      </Dialog> */}
      {/* QR Code modal */}
      {/* <Dialog open={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
        <DialogTitle>QR Code Content</DialogTitle>
        <DialogContent>
          <DialogContentText>{qrCodeContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQrCodeModal(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default CompanyTable;
