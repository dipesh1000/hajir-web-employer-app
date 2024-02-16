import React, { useState } from "react";
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import EditProfileDialog from "./EditProfileDialog";

const ProfileDialog = ({ open, handleClose, profileData }) => {
  const [editProfileOpen, setEditProfileOpen] = useState(false); // State to manage visibility of Edit Profile dialog

  // Formik initialization for viewing profile
  const formikView = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      gender: profileData?.gender || "Mr",
      birthdate: profileData?.birthdate || "",
      maritalStatus: profileData?.maritalStatus || "married",
      phone: profileData?.phone || "",
    },
    onSubmit: async (values) => {
      console.log("View Form submitted:", values);
      // Add your submission logic here
    },
  });

  const handleEditProfileOpen = () => {
    handleClose(); // Close the current dialog
    setEditProfileOpen(true); // Open the Edit Profile dialog
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Profile</DialogTitle>
        <DialogContent>
          <Avatar
            src={"/avatar.svg"}
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              marginBottom: 20,
            }}
            alt="Profile Avatar"
          />
          <form onSubmit={formikView.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formikView.values.name}
              disabled
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formikView.values.email}
              disabled
            />
            <TextField
              fullWidth
              id="birthdate"
              name="birthdate"
              label="Birthdate"
              variant="outlined"
              type="date"
              value={formikView.values.birthdate}
              disabled
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
                value={formikView.values.gender}
                disabled
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
                value={formikView.values.maritalStatus}
                disabled
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
              value={formikView.values.phone}
              disabled
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfileOpen}>Edit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Render EditProfileDialog only if editProfileOpen is true */}
      {editProfileOpen && (
        <EditProfileDialog
          open={editProfileOpen}
          handleClose={() => setEditProfileOpen(false)}
          profileData={profileData}
        />
      )}
    </>
  );
};

export default ProfileDialog;
