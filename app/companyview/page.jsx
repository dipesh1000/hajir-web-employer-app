// Import necessary dependencies
"use client";
import { useGetEmployerCompaniesQuery } from "@/services/api";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const CompanyTable = ({ companies, statusFilter = "all" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();

  const activeCompanies = companiesData?.data?.active_companies || [];
  const inactiveCompanies = companiesData?.data?.inactive_companies || [];
  const allCompanies = [...activeCompanies, ...inactiveCompanies];

  // const filteredCompanies = companies.filter((company) => {
  //   if (statusFilter === "active") {
  //     return company.status === "active";
  //   } else if (statusFilter === "inactive") {
  //     return company.status === "inactive";
  //   } else {
  //     return true; // "All" companies
  //   }
  // });
  // console.log(filteredCompanies);
  console.log(activeCompanies);
  console.log(inactiveCompanies);
  console.log(allCompanies);

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
            {/* {filteredCompanies.map((company) => ( */}
            <TableRow key={activeCompanies.id}>
              <TableCell>{activeCompanies.name}</TableCell>
              <TableCell>{activeCompanies.employee}</TableCell>
              <TableCell>{activeCompanies.approver}</TableCell>
              <TableCell>{activeCompanies.status}</TableCell>
              <TableCell>{activeCompanies.qrCode}</TableCell>
              <TableCell>
                {/* Include your action buttons here */}
                {/* Example: */}
                <IconButton>{/* Your EditIcon */}</IconButton>
                <IconButton>{/* Your DeleteIcon */}</IconButton>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyTable;
