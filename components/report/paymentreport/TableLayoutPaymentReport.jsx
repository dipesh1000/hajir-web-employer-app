"use client";

import * as React from "react";
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
import Image from "next/image";
import TablePagination from "@mui/material/TablePagination";
import { Badge, Tab, Tabs } from "@mui/material";

const mockData = [
  {
    id: 1,
    name: "John Doe",
    clockIn: "08:00 AM",
    clockOut: "05:00 PM",
    department: "Software",
    attendanceStatus: "Present",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "BIraj Doe",
    clockIn: "09:30 AM",
    clockOut: "06:30 PM",
    department: "Management",
    attendanceStatus: "Present",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    name: "Pooja Smith",
    clockIn: "10:15 AM",
    clockOut: "07:45 PM",
    department: "Software",
    attendanceStatus: "Absent",
    email: "bob.smith@example.com",
  },
  {
    id: 4,
    name: "Alice Johnson",
    clockIn: "08:45 AM",
    clockOut: "05:15 PM",
    department: "Management",
    attendanceStatus: "Present",
    email: "alice.johnson@example.com",
  },
  {
    id: 5,
    name: "David Brown",
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    department: "Manager",
    attendanceStatus: "Absent",
    email: "david.brown@example.com",
  },
  {
    id: 6,
    name: "Laura White",
    clockIn: "10:30 AM",
    clockOut: "07:30 PM",
    department: "Software",
    attendanceStatus: "Present",
    email: "laura.white@example.com",
  },
  {
    id: 7,
    name: "Michael Miller",
    clockIn: "08:15 AM",
    clockOut: "05:45 PM",
    department: "Management",
    attendanceStatus: "Present",
    email: "michael.miller@example.com",
  },
];
const departments = ["Software", "Management", "Manager"];

export default function TableLayoutPaymentReport() {
  const [filteredData, setFilteredData] = React.useState(mockData);
  const [searchText, setSearchText] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedDepartment, selectedTab);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setPage(0); // Reset page when changing the department
    filterData(searchText, department, selectedTab);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    filterData(searchText, selectedDepartment, newValue);
  };

  const filterData = (searchText, department, tabValue) => {
    const filtered = mockData.filter(
      (person) =>
        person.name.toLowerCase().includes(searchText) &&
        (department === "" || person.department === department) &&
        (tabValue === 0 ||
          person.attendanceStatus.toLowerCase() === getTabLabel(tabValue))
    );
    setFilteredData(filtered);
  };

  const getTabLabel = (index) => {
    switch (index) {
      case 0:
        return "";
      case 1:
        return "Paid";
      case 2:
        return "UnPaid";

      default:
        return "";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const notificationsCount = {
    all: 10,
    present: 5,
    absent: 3,
    leave: 2,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 500 }}>
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <div>
                All
                <span
                  style={{
                    backgroundColor: "#22408B",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    marginBottom: "4px",
                    marginRight: "6px",
                    marginLeft: "6px",
                  }}
                >
                  {notificationsCount.all}
                </span>
              </div>
            }
          />
          <Tab
            label={
              <div>
                Paid
                <span
                  style={{
                    backgroundColor: "#00800033",
                    color: "#008000",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    marginBottom: "4px",
                    marginRight: "6px",
                    marginLeft: "6px",
                  }}
                >
                  {notificationsCount.present}
                </span>
              </div>
            }
          />
          <Tab
            label={
              <div>
                UnPaid
                <span
                  style={{
                    backgroundColor: "#FF505033",
                    color: "#FF5050",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    marginBottom: "4px",
                    marginRight: "6px",
                    marginLeft: "6px",
                  }}
                >
                  {notificationsCount.absent}
                </span>
              </div>
            }
          />
        </Tabs>

        <br />

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
              <TableCell>Employee Name</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Attendance Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {/* Add your image component here */}
                      <Image
                        src="/hajir-logo.png"
                        alt="Employee"
                        width={30}
                        height={30}
                        style={{
                          marginRight: "8px",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      <Box>
                        <div>{person.name}</div>
                        <div style={{ fontSize: "0.8em", color: "gray" }}>
                          {person.email}
                        </div>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{person.clockIn}</TableCell>
                  <TableCell>{person.clockOut}</TableCell>
                  <TableCell>
                    <Box>
                      <span
                        sx={{
                          color:
                            person.attendanceStatus === "Present"
                              ? "green"
                              : "red",
                          backgroundColor:
                            person.attendanceStatus === "Present"
                              ? "#e5f7e9"
                              : "#fde5e5",
                          padding: "6px 12px",
                          borderRadius: "4px",
                        }}
                      >
                        {" "}
                        {person.attendanceStatus}
                      </span>
                    </Box>
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
}
