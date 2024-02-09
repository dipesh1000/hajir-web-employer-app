"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ProfileContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
});

const NewBootstrapDialog = styled(Dialog)(() => ({}));

export default function ProfileCard() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: "Nitesh Shrestha",
    email: "nitesh@gmail.com",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSaveProfile = () => {
    // Save changes
    setEditMode(false);
    handleCloseDialog();
  };

  const handleCancelEdit = () => {
    // Cancel editing
    setEditMode(false);
    handleCloseDialog();
  };

  return (
    <>
      <ProfileContainer onClick={handleOpenDialog}>
        <Avatar
          src="/avatar.svg"
          sx={{
            width: 100,
            height: 100,
          }}
          alt="Profile Avatar"
        />
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: "semi-bold",
            mt: 1,
            color: "black",
            textTransform: "none",
          }}
        >
          {userData.name}
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          sx={{ textTransform: "none" }}
        >
          {userData.email}
        </Typography>
      </ProfileContainer>

      <NewBootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editMode ? "Edit Profile" : "Profile Details"}
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
        <DialogContent dividers>
          {editMode ? (
            <>
              <Avatar
                src="/avatar.svg"
                sx={{
                  width: 80,
                  height: 80,
                }}
                alt="Profile Avatar"
              />
              <input
                type="file"
                accept="image/*"
                style={{ margin: "10px 0" }}
              />
            </>
          ) : (
            <Avatar
              src="/avatar.svg"
              sx={{
                width: 100,
                height: 100,
              }}
              alt="Profile Avatar"
            />
          )}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            disabled={!editMode}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            disabled={!editMode}
          />
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleSaveProfile}>
                Save Changes
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </>
          ) : (
            <Button
              sx={{
                backgroundColor: "#f9f9f9",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          )}
        </DialogActions>
      </NewBootstrapDialog>
    </>
  );
}
