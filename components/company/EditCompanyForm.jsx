import React, { useState, useEffect } from "react";
import {
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const EditCompanyForm = ({ companyIdToEdit, onClose, onUpdate }) => {
  const [companyToEdit, setCompanyToEdit] = useState({});

  useEffect(() => {
    // Set the initial values when companyIdToEdit changes
    setCompanyToEdit(companyIdToEdit);
  }, [companyIdToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyToEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Call the onUpdate function with the updated data
    onUpdate(companyToEdit);
  };

  return (
    <Box>
      <DialogContent>
        <Typography variant="h6">Edit Company</Typography>
        <TextField
          label="Company Name"
          value={companyToEdit.name || ""}
          onChange={handleChange}
          name="name"
          fullWidth
          margin="normal"
        />
        {/* Add other fields similar to the one above */}
      </DialogContent>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary" ml={2}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditCompanyForm;
