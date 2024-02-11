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
import LoopIcon from "@mui/icons-material/Loop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import styles from "styled-components";

const ProfileContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
});

const NewBootstrapDialog = styled(Dialog)(() => ({
  marginLeft: "160px",
}));

const Wrapper = styles.div`
  width: "490%"
`;

const Container = styles.div`
  display: flex;
  flex-direction: column;
`;

const Row = styles.div`
  display: flex;
  align-items: center; /* Vertically center elements */
`;

const Column = styles.div`
  flex: 1;
  margin-right: 10px;
`;

export default function ProfileCard() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [changePhoneMode, setChangePhoneMode] = React.useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = React.useState("");
  const [confirmPhoneNumber, setConfirmPhoneNumber] = React.useState("");
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

  const handleChangePhoneNumber = () => {
    setChangePhoneMode(!changePhoneMode);
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
      <Wrapper>
        <NewBootstrapDialog
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          fullWidth
          maxWidth="md"
          scroll="body"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h1
              style={{
                textAlign: "center",
                marginTop: "-10px",
                fontWeight: "400",
              }}
            >
              Profile
            </h1>
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
              src="/avatar.svg"
              sx={{
                width: 140,
                height: 140,
                marginLeft: "360px",
                marginTop: "-20px",
              }}
              alt="Profile Avatar"
            />
            <DialogActions>
              {!editMode && (
                <Button
                  sx={{
                    marginRight: "350px",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    color: "#000",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleEditProfile}
                >
                  <EditIcon />
                  Edit Profile
                </Button>
              )}
            </DialogActions>
            <h1 style={{ marginTop: "-5px" }}>Personal Details</h1>
            <Container>
              <Row>
                <FormControl style={{ width: "130px", marginTop: "8px" }}>
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
                  >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                  </Select>
                </FormControl>
                <Column>
                  <TextField
                    label="Name"
                    margin="normal"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    disabled={!editMode}
                    sx={{ width: "300px", marginLeft: "20px" }}
                  />
                </Column>
                <Column>
                  <TextField
                    label="Email"
                    margin="normal"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    disabled={!editMode}
                    sx={{ width: "400px" }}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <TextField
                    label="10/2/1995"
                    margin="normal"
                    value={userData.birthdate}
                    onChange={(e) =>
                      setUserData({ ...userData, birthdate: e.target.value })
                    }
                    disabled={!editMode}
                    sx={{ width: "433px" }}
                  />
                </Column>
                <Column>
                  <TextField
                    label="Married"
                    margin="normal"
                    value={userData.maritalStatus}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        maritalStatus: e.target.value,
                      })
                    }
                    disabled={!editMode}
                    sx={{ width: "399px" }}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  {!editMode && (
                    <TextField
                      label="Initial Phone Number"
                      margin="normal"
                      value={userData.phone}
                      disabled
                      sx={{ width: "433px" }}
                    />
                  )}
                  {editMode && (
                    <TextField
                      label="Old Phone Number"
                      margin="normal"
                      value={userData.phone}
                      disabled
                      sx={{ width: "433px" }}
                    />
                  )}
                </Column>
              </Row>
              <Row>
                {editMode && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                   
                      }}
                    >
                     
                     <div className="change"
  onClick={handleChangePhoneNumber}
  style={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  {changePhoneMode ? (
    <CheckCircleIcon style={{ marginRight: "10px"  }} />
  ) : (
    <CircleOutlinedIcon style={{ marginRight: "10px"}} />
  )}
  <span>Change Phone number</span>
</div>



                    </div>
                 {changePhoneMode && (


<div sx={{marginTop:"100px"}}>
  <TextField/>
  <TextField/>
</div>
                 )}



                    {/* {changePhoneMode && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        

                          flexDirection: "column", // Change to column layout
                          alignItems: "flex-start", // Align items to the start
                      
                        }}
                      >
                        <TextField
                          label="New Phone Number"
                          margin="normal"
                          value={newPhoneNumber}
                          onChange={(e) => setNewPhoneNumber(e.target.value)}
                          style={{ width: "443px" }}
                        />
                        <TextField
                          label="Confirm New Phone Number"
                          margin="normal"
                          value={confirmPhoneNumber}
                          onChange={(e) =>
                            setConfirmPhoneNumber(e.target.value)
                          }
                          style={{ width: "400px" }}
                        />
                      </div>
                    )} */}
                  </>
                )}
              </Row>
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
                  marginLeft: "400px",
               marginTop:'10px'
                }}
              >
                <LoopIcon />
                Update
              </Button>
              <h2></h2>
            </>
          )}
    
        </NewBootstrapDialog>
      </Wrapper>
    </>
  );
}
