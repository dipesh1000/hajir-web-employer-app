
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
import LoopIcon from '@mui/icons-material/Loop';
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import styles from "styled-components";



const NewBootstrapDialog = styled(Dialog)(() => ({

  marginLeft: "160px",
}));

const Wrapper = styles.div`
  width: "490%"
`;

const Container = styles.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export default function ProfileCard() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: "Nitesh Shrestha",
    email: "nitesh@gmail.com",
    gender: "Mr",
    birthdate: "10/2/1995",
    maritalStatus: "married",
    phone: "9887679041",
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
    setEditMode(false);
    handleCloseDialog();
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    handleCloseDialog();
  };

  return (
    <>
      <Wrapper>
        <NewBootstrapDialog
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h1 style={{ textAlign: "center" }}>Profile</h1>
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
            <Avatar
              src="/avatar.svg"
              sx={{
                width: 100,
                height: 100,
                marginLeft: "230px",
              }}
              alt="Profile Avatar"
            />
            <DialogActions>
              {!editMode && (
                <Button
                  sx={{
                    marginRight: "190px",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    color: "#000",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              )}
            </DialogActions>
            <h1 style={{ marginTop: "-5px" }}>Personal Details</h1>
            <Container>
              <FormControl>
                <InputLabel htmlFor="demo-simple-select-label">
                  Gender <span style={{ color: "red" }}> *</span>
                </InputLabel>{" "}
                <Select
                  value={userData.gender}
                  label="Gender"
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  disabled={!editMode}
                  style={{ width: "120px" }}
                >
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
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
              <TextField
                label="10/2/1995"
                fullWidth
                margin="normal"
                value={userData.birthdate}
                onChange={(e) =>
                  setUserData({ ...userData, birthdate: e.target.value })
                }
                disabled={!editMode}
              />
              <TextField
                label="Married"
                fullWidth
                margin="normal"
                value={userData.maritalStatus}
                onChange={(e) =>
                  setUserData({ ...userData, maritalStatus: e.target.value })
                }
                disabled={!editMode}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                disabled={!editMode}
              />
            </Container>
          </DialogContent>
          <h1></h1>
          {editMode && (
            <>
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{
                  width: "150px",
                  height: "59px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginLeft: "230px",
                }}
              >
                <LoopIcon />
                Update
              </Button>
            </>
          )}
          <h2></h2>
        </NewBootstrapDialog>
      </Wrapper>
    </>
  );
}
