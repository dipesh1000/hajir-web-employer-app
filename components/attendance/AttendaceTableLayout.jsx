import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useGetAttendanceReportTodayQuery } from "@/services/api";
import { useParams } from "next/navigation";
import Link from "next/link";

const AttendanceTable = () => {
  const { companyId } = useParams();

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: attendanceData, isLoading: isLoading2 } =
    useGetAttendanceReportTodayQuery(companyId);

  useEffect(() => {
    if (
      attendanceData &&
      attendanceData.data &&
      attendanceData.data.candidates
    ) {
      setFilteredData(attendanceData.data.candidates);
    }
  }, [attendanceData]);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedDepartment);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    filterData(searchText, department);
  };

  const filterData = (searchText, department) => {
    if (
      !attendanceData ||
      !attendanceData.data ||
      !attendanceData.data.candidates
    )
      return;

    let filtered = attendanceData.data.candidates;
    if (searchText) {
      filtered = filtered.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchText)
      );
    }
    if (department) {
      filtered = filtered.filter((candidate) =>
        candidate.departments.some((dept) => dept.name === department)
      );
    }
    setFilteredData(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            label="Department"
            autoWidth={false}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <MenuItem value="">All Departments</MenuItem>
            {/* Add options dynamically based on backend response */}
            {attendanceData &&
              attendanceData.data &&
              attendanceData.data.departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Departments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.candidate_id}</TableCell>
                  <Link
                    href={`/dashboard/company/${companyId}/attendance/${candidate.id}`}
                  >
                    <TableCell>{candidate.name}</TableCell>
                  </Link>

                  <TableCell>{candidate.phone}</TableCell>
                  <TableCell>{candidate.status}</TableCell>
                  <TableCell>
                    {candidate.departments.map((department) => (
                      <div key={department.id}>{department.name}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AttendanceTable;
