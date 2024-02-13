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
} from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import StatusChangeIcon from "@mui/icons-material/TrackChanges";
import {
  useDeleteCandidateMutation,
  useInviteCandidateMutation,
} from "@/services/api";
import { useParams } from "next/navigation";

const EmployeeTable = ({ candidateData, statusFilter }) => {
  const [inviteCandidate] = useInviteCandidateMutation();
  const [deleteCandidate] = useDeleteCandidateMutation();
  const [selectedCandidateId, setSelectedCandidateId] = useState();
  const { companyId } = useParams();

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
    console.log("Candidate ID:", candidate_id);
    setSelectedCandidateId(candidate_id);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const candidate_id = selectedCandidateId;
    console.log("Candidate deleted successfully");

    try {
      await deleteCandidate(companyId, candidate_id);
      setIsConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleUpdate = () => {
    // Implement update functionality here
  };

  const handleStatusChange = () => {
    // Implement status change functionality here
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
            {candidates &&
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
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
                      onClick={() => handleDeleteClick(candidate.candidate_id)}
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
          <Button onClick={handleConfirmDelete} color="primary">
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
