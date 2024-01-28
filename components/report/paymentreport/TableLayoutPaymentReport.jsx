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
import { Tab, Tabs } from "@mui/material";

const mockData = [
  {
    id: 1,
    name: "John Doe",
    PaymentStatus: "Paid",
    PaymentAmount: "30,000",
  },
  {
    id: 2,
    name: "Biraj Doe",
    PaymentStatus: "Unpaid",
    PaymentAmount: "40,000",
  },
  // Add more data objects as needed
];

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
          person.PaymentStatus.toLowerCase() === getTabLabel(tabValue))
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
        return "Unpaid";
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
    all: mockData.length,
    paid: mockData.filter((person) => person.PaymentStatus === "Paid").length,
    unpaid: mockData.filter((person) => person.PaymentStatus === "Unpaid")
      .length,
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
                  {notificationsCount.paid}
                </span>
              </div>
            }
          />
          <Tab
            label={
              <div>
                Unpaid
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
                  {notificationsCount.unpaid}
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
            {/* No need to iterate over departments since it's not present in mockData */}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Payment Amount</TableCell>
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
                        {/* No email field in mockData */}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{person.PaymentStatus}</TableCell>
                  <TableCell>{person.PaymentAmount}</TableCell>
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
