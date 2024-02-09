// EmployeeTable.js

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const EmployeeTable = ({ candidateData, statusFilter }) => {
  const candidates =
    statusFilter === "active"
      ? candidateData?.data?.active_candidates
      : candidateData?.data?.inactive_candidates;

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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;
