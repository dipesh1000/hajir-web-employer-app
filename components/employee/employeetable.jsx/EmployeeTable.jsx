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
  DialogActions,
  Button,
  DialogContentText,
  TablePagination,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel, // Added TablePagination import
} from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StatusChangeIcon from "@mui/icons-material/TrackChanges";
import {
  useDeleteCandidateQuery,
  useInviteCandidateMutation,
} from "@/services/api";
import { useParams } from "next/navigation";

const EmployeeTable = ({ candidateData, statusFilter }) => {
  const candidates =
    statusFilter === "active"
      ? candidateData?.data?.active_candidates
      : candidateData?.data?.inactive_candidates;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] =
    useState(false);

  const openInviteDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };
  const [filteredData, setFilteredData] = useState(candidates);
  console.log("candidateData", candidateData);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);
  const [inviteCandidate] = useInviteCandidateMutation();
  const deleteCandidate = useDeleteCandidateQuery();
  const [selectedCandidateId, setSelectedCandidateId] = useState();
  const { companyId } = useParams();

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedTab);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    filterData(searchText, newValue);
  };

  const filterData = (searchText) => {
    const filtered = companies.filter((candidates) =>
      candidates.name.toLowerCase().includes(searchText)
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

  const handleInvite = async () => {
    try {
      const status = "Not-Approved";
      const { data } = await inviteCandidate({
        candidate_id: selectedCandidate.candidate_id,
        status,
        companyId: companyId,
      });
      if (data) {
        console.log("Invite sent successfully", data);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCandidate({ candidate_id: selectedCandidateId, companyId });
      console.log("Candidate deleted successfully");
      setIsConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleCloseStatusChangeDialog = () => {
    setIsStatusChangeDialogOpen(false);
  };

  const handleDeleteClick = (candidate_id) => {
    setSelectedCandidateId(candidate_id);
    setIsConfirmationDialogOpen(true);
  };

  const handleUpdate = () => {
    // Implement update functionality here
  };

  const handleStatusChange = () => {
    // Implement status change functionality here
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
          <Select
            // value={selectedDepartment}
            // onChange={handleDepartmentChange}
            label="Department"
            autoWidth={false}
          >
            <MenuItem value="">All Departments</MenuItem>
            {/* {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
        <br />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Marriage Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Candidate ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>{candidate.designation}</TableCell>
                    <TableCell>{candidate.phone}</TableCell>
                    <TableCell>{candidate.status}</TableCell>
                    <TableCell>{candidate.code}</TableCell>
                    <TableCell>{candidate.marriage_status}</TableCell>
                    <TableCell>{candidate.candidate_id}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="invite"
                        onClick={() => openInviteDialog(candidate)}
                      >
                        <InsertInvitationIcon />
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={() => setIsUpdateDialogOpen(true)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          handleDeleteClick(candidate.candidate_id)
                        }
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                      <IconButton
                        aria-label="status change"
                        onClick={() => setIsStatusChangeDialogOpen(true)}
                      >
                        <StatusChangeIcon />
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Invite Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to invite {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleInvite} variant="contained" color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
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

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this employee?
          </DialogContentText>
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

      <Dialog
        open={isStatusChangeDialogOpen}
        onClose={handleCloseStatusChangeDialog}
      >
        <DialogTitle>Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of{" "}
            {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusChangeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeTable;
