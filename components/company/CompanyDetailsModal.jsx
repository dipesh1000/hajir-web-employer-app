// CompanyDetailsModal.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const CompanyDetailsModal = ({ onClose }) => {
  const companyIdToEdit = useSelector((state) => state.companyIdToEdit);
  const companies = useSelector((state) => state.companies);

  // Find the company with the given ID
  const companyToEdit = companies.find(
    (company) => company.id === companyIdToEdit
  );

  return (
    <Dialog open={Boolean(companyIdToEdit)} onClose={onClose}>
      <DialogTitle>Company Details</DialogTitle>
      <DialogContent>
        {companyToEdit && (
          <div>
            <Typography variant="body1">
              Company Name: {companyToEdit.name}
            </Typography>
            {/* Display other details as needed */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetailsModal;
