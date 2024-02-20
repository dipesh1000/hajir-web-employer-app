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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
  const handleCloseDialog = () => {
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle
          style={{
            textAlign: "center",
            marginTop: "-10px",
            fontWeight: "500",
            marginBottom: "10px",
            fontSize: "26px",
          }}
        >
          Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
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
          <DialogActions>
            <Button
              onClick={handleEditProfileOpen}
              sx={{
                marginRight: "350px",
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "#000",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop:'-240px',
              }}
            >
              {" "}
              <EditIcon />
              Edit Profile
            </Button>
      
          </DialogActions>
          <span>Personal details</span>
          <form onSubmit={formikView.handleSubmit}>
            <FormControl style={{ width: "120px", marginBottom: "20px" }}>
              <Select
                id="gender"
                name="gender"
                variant="outlined"
                value={formikView.values.gender}
                disabled
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formikView.values.name}
              disabled
              sx={{ width: "310px", marginLeft: "20px", marginBottom: "20px" }}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formikView.values.email}
              disabled
              sx={{ width: "380px", marginLeft: "20px", marginBottom: "20px" }}
            />
            <TextField
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
              sx={{ width: "450px", marginBottom: "20px" }}
            />

            <FormControl>
              <Select
                id="maritalStatus"
                name="maritalStatus"
                variant="outlined"
                value={formikView.values.maritalStatus}
                disabled
                sx={{
                  width: "380px",
                  marginLeft: "20px",
                  marginBottom: "20px",
                }}
              >
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="unmarried">Unmarried</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              variant="outlined"
              value={formikView.values.phone}
              disabled
              sx={{ width: "450px", marginBottom: "20px" }}
            />
          </form>
        </DialogContent>
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
