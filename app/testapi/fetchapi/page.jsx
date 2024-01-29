"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const apiUrl =
  "https://hajirappv2.an4soft.com/api/v2/employer/company/employercompanies";

const token =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDVmMGVkODAxNzAwNjBjNWYyZTBmOWI0NDkwYWU2Njg0NTIzYzczZThkNjliMDg4ZGMwNzc3Zjc4MzQwN2NhZDQ0MDUxMjA3N2EyMGIzNWUiLCJpYXQiOjE3MDY0MTQ0MDkuMDY2NzgsIm5iZiI6MTcwNjQxNDQwOS4wNjY3ODYsImV4cCI6MTczODAzNjgwOS4wNjQ3NzEsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.f3PwHyWvQN0KJJpwquATJwn4LkGOl30Z5UBvCy0Zn4qooWJjIEiDCBIDNApwUO6eURuHd8v3FV7h8zQONPFEmjDiRW100kyNMC2KadS2YMr4-RLK3Tp3lG94XFzY3nq0v3ISvgBMvzmh2h0KOWo5VmVN4nHkU75nzTDBRzS4PH_08KLA_VXiSy3OBNx3OxDxiSMh1sNCshc0FHeBqrx_r5wIvg0q7TAim064fmOgPQBP1jlbL36aSQSCl3YqKxxR0ra4Udr5oMioo7pfKYgGte_QHXZ-HHYT_7LeYTi9jddWr3mPo1qfmZ_etRFi3t7NhahRFs2p6h-oeawqHIeajHU__k0iQwTcfrMdD2Xs09u9XE9MQaeBSjRO17oKJhm5E3-i7ZklpF2KGFYvdBnG56j3LuFPjhUNf5TbIGvIl-rCgWUb-_KrRpIFqnbWYXipYKIq_Dq54eZrJ0GyzcXU1oz6YD_T1FVgBHmM5quV5ScgCBtFzahL6sdugellBvTDHQyRwEEToKaii_f0h1q9DYxgklgEVqd29p07oClKFlLHLzYw1G4LtL3rJ_oirYstQnv3AjilT8dj2iEf6NnYqwvIPL_RpjD8LQIEbAqBv57dN5ftnqFfHKMGu5T9P2USu2uS7UPYDfGDWmsdWtt6_tFu2OiAGRcUkh0ZwH6WWnY";

const myHeaders = {
  Accept: "application/json",
  Authorization: token,
};

const CompanyList = () => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, { headers: myHeaders });
        setCompanyData(response.data.data.active_companies);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Company Data
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Generate Code</TableCell>
                <TableCell>Company Code</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Employee Count</TableCell>
                <TableCell>Approver Count</TableCell>
                <TableCell>QR Path</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyData &&
                companyData.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.generate_code.toString()}</TableCell>
                    <TableCell>{company.company_code}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.employee_count}</TableCell>
                    <TableCell>{company.approver_count}</TableCell>
                    <TableCell>{company.qr_path}</TableCell>
                    <TableCell>{company.created_at}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CompanyList;
