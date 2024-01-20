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
  Box,
  Tooltip,
} from "@mui/material";

import Link from "next/link";

const EmployeeTable = ({}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Staff Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {filteredCompanies.map((company) => ( */}
            <TableRow>
              <TableCell>
                <Link href="/dashboard/company">
                  <Button color="primary">Alex</Button>
                </Link>
              </TableCell>
              <TableCell>Software</TableCell>
              <TableCell>012A</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>9808426215</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;
