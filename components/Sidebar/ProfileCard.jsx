import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
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
import { MenuItem, Select, InputLabel, FormControl, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "styled-components";
import { CalendarIcon } from "@mui/x-date-pickers";

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
  width: "100%";
  display: flex;
  flex-direction:row,
  gap: 5px,
`;

const LeftColumn = styles.div`
  flex: 1;
justify-content: space-evenly,
align-items: center,
`;

const RightColumn = styles.div`
  flex: 1;
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
      <ProfileContainer onClick={handleOpenDialog} >
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
         
          maxWidth= "md"
          // maxWidth={editMode ? "md" : "md"}
          scroll="body"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h1
              style={{
                textAlign: "center",
                marginTop: "-10px",
                fontWeight: "400",
                marginBottom:'-30px'
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
                width: 136,
                height: 125,
                marginLeft: "360px",
    
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
            <h1 style={{ marginTop: "20px" ,marginBottom:'-15px', fontWeight:'300', fontSize:'18px'}}>Personal Details</h1>
            <div style={{ display: "flex" }}>
              <LeftColumn>
                <FormControl sx={{marginTop:'16px'}} >

    
<Select
  value={userData.gender}
  onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
  disabled={!editMode} // Disable select functionality based on editMode
  sx={{
    "& .MuiSelect-icon": {
      color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
    }, width:'100px',
  }}
>
  <MenuItem value="Mr">Mr</MenuItem>
  <MenuItem value="Mrs">Mrs</MenuItem>
</Select>




                </FormControl>
             
                  {/* <TextField
    
    margin="normal"
    value={userData.name}


    {editMode && (
      label="Full name"
    )}
    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
    disabled={!editMode}
  sx={{marginLeft:'20px', width:'285px'}}
  /> */}

  



{/* <TextField
  margin="normal"
  value={userData.name}
  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
  disabled={!editMode}
  sx={{ marginLeft: '20px', width: '285px' }}
  placeholder={editMode ? 'Full name' : ''}
/> */}

{/* <TextField
  margin="normal"
  value={editMode ? '' : userData.name} // Set value to empty string in edit mode
  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
  disabled={!editMode}
  sx={{ marginLeft: '20px', width: '285px' }}
  placeholder="Full name" // Always show "Full name" as placeholder
/> */}
<TextField
  margin="normal"
  value={userData.name} // Set value to empty string in edit mode
  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
  disabled={!editMode}
  sx={{ marginLeft: '20px', width: '285px' }}
  placeholder={editMode ? 'Full name': ''} // Always show "Full name" as placeholder
/>



     <TextField
                  // label="Birthdate"
                  margin="normal"
                  value={userData.birthdate}
                  onChange={(e) =>
                    setUserData({ ...userData, birthdate: e.target.value })
                  }
                  disabled={!editMode}
                  sx={{ width: "405px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                     
                        >
                          <CalendarIcon />
    
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

              </LeftColumn>
              <RightColumn>
           
                   <TextField
              
                  margin="normal"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled={!editMode}
                  sx={{ width: "100%" }}
                />
 

 {editMode ? (
  <FormControl sx={{ width: "100%", marginTop:'16px' }}>
   
    <Select
      value={userData.maritalStatus}
      onChange={(e) =>
        setUserData({ ...userData, maritalStatus: e.target.value })
      }
      sx={{
        "& .MuiSelect-icon": {
          color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
        }, 
      }}
    >
      <MenuItem value="married">Married</MenuItem>
      <MenuItem value="unmarried">Unmarried</MenuItem>
    </Select>
  </FormControl>
) : (
  <TextField
    margin="normal"
    value={userData.maritalStatus === "married" ? "Married" : "Unmarried"}
    disabled={!editMode}
    sx={{ width: "100%" }}
  />
)}




              </RightColumn>

            </div>
            <TextField

              margin="normal"
              value={userData.phone}
              disabled
              sx={{ width: "405px" }}
             
            />

{editMode && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "",
                      }}
                    >
                      {changePhoneMode ? (
                        <CheckCircleIcon     onClick={handleChangePhoneNumber} style={{ marginRight: "10px",  color: "rgb(0, 0, 139)",}} />
                      ) : (
                        <CircleOutlinedIcon      onClick={handleChangePhoneNumber} style={{ marginRight: "10px", color: "rgb(0, 0, 139)", }} />
                      )}
                      <h1
                        onClick={handleChangePhoneNumber}
                        style={{
                          fontWeight: "100",
                          fontSize: "17px",
                          width: "200px",
                        }}
                      >
                        Change Phone number
                      </h1>
                    </div>
                    {changePhoneMode && (
                     <>
                        <TextField
                          label="Change number"
                          margin="normal"
                          value={newPhoneNumber}
                          onChange={(e) => setNewPhoneNumber(e.target.value)}
                          style={{ width: "405px", marginRight:'25px' }}
                        />
                        <TextField
                          label="Confirm Change Number"
                          margin="normal"
                          value={confirmPhoneNumber}
                          onChange={(e) =>
                            setConfirmPhoneNumber(e.target.value)
                          }
                          style={{ width: "420px" }}
                        />
                     </>
                    )}
                  </>
                )}
          </DialogContent>






          {editMode && (
            <DialogActions sx={{  justifyContent: "center", marginBottom:'5px', marginTop:'-10px'}}>
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{
                  width: "150px",
                  height: "45px",
                  justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                  // marginLeft: "auto",
                 
                }}
              >
                <LoopIcon />
                Update
              </Button>
            </DialogActions>
          )}
      
        </NewBootstrapDialog>
      </Wrapper>
    </>
  );
}


