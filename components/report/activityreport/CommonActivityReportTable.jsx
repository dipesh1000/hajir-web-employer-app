// CommonActivityReportTable.js
"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";

const CommonActivityReportTable = ({ data, departments }) => {
  const [filteredData, setFilteredData] = React.useState(data);
  const [searchText, setSearchText] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedDepartment);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setPage(0); // Reset page when changing the department
    filterData(searchText, department);
  };

  const filterData = (searchText, department) => {
    const filtered = data.filter(
      (activity) =>
        activity.name.toLowerCase().includes(searchText) &&
        (department === "" || activity.department === department)
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 500 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Activity Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <FormControl variant="outlined" size="small" sx={{ ml: 2, width: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            label="Department"
            autoWidth={false}
          >
            <MenuItem value="">All Departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Activity Name</TableCell>
              <TableCell>Clock in</TableCell>
              <TableCell>CLock Out Name</TableCell>
              <TableCell> Attendance Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.clockIn}</TableCell>
                  <TableCell>{activity.clockOut}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: getColorForStatus(activity.types),
                        backgroundColor: getBackgroundColorForStatus(
                          activity.types
                        ),
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        marginBottom: "4px",
                        marginRight: "6px",
                        marginLeft: "6px",
                      }}
                    >
                      {activity.types}
                    </span>
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

const getColorForStatus = (status) => {
  switch (status) {
    case "Present":
      return "green";
    case "Absent":
      return "red";
    case "LateClockin":
      return "orange";
    case "EarlyClockin":
      return "blue";
    case "LeaveTaken":
      return "purple";
    case "ExtraTaken":
      return "pink";
    default:
      return "black";
  }
};

const getBackgroundColorForStatus = (status) => {
  switch (status) {
    case "Present":
      return "#00800033";
    case "Absent":
      return "#FF000033";
    case "LateClockin":
      return "#FFA50033";
    case "EarlyClockin":
      return "#0000FF33";
    case "LeaveTaken":
      return "#80008033";
    case "ExtraTaken":
      return "#FFC0CB33";
    default:
      return "transparent";
  }
};

export default CommonActivityReportTable;
