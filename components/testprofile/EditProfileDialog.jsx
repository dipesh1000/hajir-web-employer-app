import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import {
  useChangePhoneNumberMutation,
  useUpdateProfileMutation,
} from "@/services/api";

const EditProfileDialog = ({ open, handleClose, profileData }) => {
  const updateProfile = useUpdateProfileMutation();
  const changePhoneNumber = useChangePhoneNumberMutation();

  const formikEdit = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      gender: profileData?.gender || "Mr",
      birthdate: profileData?.birthdate || "",
      maritalStatus: profileData?.maritalStatus || "married",
      phone: profileData?.phone || "",
      photo: "",
    },
    onSubmit: async (values) => {
      console.log("Edit Form submitted:", values);
      // Add your submission logic here
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={formikEdit.handleSubmit} encType="multipart/form-data">
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formikEdit.values.name}
            onChange={formikEdit.handleChange}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formikEdit.values.email}
            onChange={formikEdit.handleChange}
          />
          <TextField
            fullWidth
            id="birthdate"
            name="birthdate"
            label="Birthdate"
            variant="outlined"
            type="date"
            value={formikEdit.values.birthdate}
            onChange={formikEdit.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth>
            <Select
              id="gender"
              name="gender"
              label="Gender"
              variant="outlined"
              value={formikEdit.values.gender}
              onChange={formikEdit.handleChange}
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Miss">Miss</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              id="maritalStatus"
              name="maritalStatus"
              label="Marital Status"
              variant="outlined"
              value={formikEdit.values.maritalStatus}
              onChange={formikEdit.handleChange}
            >
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            variant="outlined"
            value={formikEdit.values.phone}
            onChange={formikEdit.handleChange}
          />
          <div>
            <label> Upload File</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={formikEdit.handleChange} // Change this line
            />{" "}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={formikEdit.handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
