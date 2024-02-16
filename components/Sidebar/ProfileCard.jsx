
"use client"
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
import { BackdropProps } from "@mui/material/Dialog";
import * as Yup from "yup";

const ProfileContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
});

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  birthdate: Yup.string().required("Birthdate is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
 

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
const BlurBackdrop = styled('div')({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export default function ProfileCard() {
  
  const [avatarClicked, setAvatarClicked] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

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
  const formik = useFormik({
    initialValues: userData,
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [uploadedImage, setUploadedImage] = React.useState(null); // Store the uploaded image
  const handleAvatarClick = () => {
    setAvatarClicked(true);
    setDialogOpen(true);
  };
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
    if (Object.keys(formik.errors).length > 0) {
      // If there are errors, do not close the dialog
      return;
    }
    setEditMode(false);
    handleCloseDialog();
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    handleCloseDialog();
  };

  const handleChangePhoneNumber = () => {
    setChangePhoneMode(!changePhoneMode);

 
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the uploaded image as the avatar
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFieldChange = (e, fieldName) => {
    formik.handleChange(e);

    setUserData({ ...userData, [fieldName]: e.target.value });
  };
  return (
    <>
      <ProfileContainer onClick={handleOpenDialog} >
        <Avatar

          src={uploadedImage || "/avatar.svg"}
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
       
          slotProps={{
            backdrop: {
              sx: { backdropFilter: avatarClicked ? 'blur(10px)' : 'none' }
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h1
              style={{
                textAlign: "center",
                marginTop: "-10px",
                fontWeight: "500",
                marginBottom: '-30px',
                fontSize: '26px'
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
      
          
<DialogContent >
{editMode ? (
  <div style={{ position: "relative", display: "inline-block" }}>
    <label htmlFor="upload-input">
      <Avatar
        src={uploadedImage || "/avatar.svg"}
        sx={{
          width: 139,
          height: 128,
          zIndex: 1, // Lower zIndex for Avatar
          marginLeft: "360px",
        }}
        alt="Profile Avatar"
      />
      <img
        src="/imageUpload.png"
        alt="Upload Image"
        style={{ position: "absolute", top: "90%", left: "93%", transform: "translate(-50%, -50%)", zIndex: 2 }}
      />
    </label>
    <input
      id="upload-input"
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleImageUpload}
    />
  </div>
) : (
  <Avatar
    src={uploadedImage || "/avatar.svg"}
    sx={{
      width: 139,
      height: 128,
      marginLeft: "360px",
    }}
    alt="Profile Avatar"
    onClick={handleAvatarClick} 
    slotProps={{
      backdrop: {
        sx: {
          backdropFilter: avatarClicked ? 'blur(90px)' : 'none' // Increase the blur when avatar is clicked
        }
      }
    }}
  />
)}
{!editMode && avatarClicked ? (
  <Dialog open={avatarClicked} onClose={() => setAvatarClicked(false)} sx={{padding:0, marginLeft:'170px',top:'0%', backgroundColor: 'transparent'}} PaperProps={{ sx: { boxShadow: 'none', borderRadius:'0' } }}>
    <Avatar
      src={uploadedImage || "/avatar.svg"}
      sx={{
        width: 229,
        height: 218,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
 backgroundColor: 'inherit',
 padding:0,

      }}
      alt="Profile Avatar"
    />
  </Dialog>
) : null}
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
            <h1 style={{ marginTop: "20px", marginBottom: '-15px', fontWeight: '300', fontSize: '18px' }}>Personal Details</h1>
            <div style={{ display: "flex" }}>
              <LeftColumn>
                <FormControl sx={{ marginTop: '16px' }} >


                  <Select
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    disabled={!editMode} // Disable select functionality based on editMode
                    sx={{
                      "& .MuiSelect-icon": {
                        color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
                      }, width: '100px',
                    }}
                  >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                  </Select>

</FormControl>

                <TextField
                  margin="normal"
                //  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  disabled={!editMode}
                  sx={{ marginLeft: '20px', width: '285px' }}
                  placeholder={editMode ? 'Full name' : ''}
                  id="name"
                  name="name"
                  // label="Name"
                  value={formik.values.name}
                  onChange={(e) => handleFieldChange(e, 'name')} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                
                />
        <TextField
                  // label="Birthdate"
                  margin="normal"
                  // value={userData.birthdate}
              
                  disabled={!editMode}
                  sx={{ width: "405px" }}
                  id="birthdate"
                  name="birthdate"
                  value={formik.values.birthdate}
                  onChange={(e) => handleFieldChange(e, 'birthdate')} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                  helperText={formik.touched.birthdate && formik.errors.birthdate}
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
                  disabled={!editMode}
                  sx={{ width: "100%" }}
                  id="email"
                  name="email"

                  value={formik.values.email}
                  onChange={(e) => handleFieldChange(e, 'email')} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
          />
         {editMode ? (
                  <FormControl sx={{ width: "100%", marginTop: '16px' }}>

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
                    <CheckCircleIcon  onClick={handleChangePhoneNumber} style={{ marginRight: "10px", color: "rgb(0, 0, 139)", }} />
                  ) : (
                    <CircleOutlinedIcon onClick={handleChangePhoneNumber} style={{ marginRight: "10px", color: "rgb(0, 0, 139)", }} />
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
                 
                      value={formik.values.newPhoneNumber}
                      onChange={(e) => handleFieldChange(e, "newPhoneNumber")}
                      id="newPhoneNumber"
                      name="newPhoneNumber"
                      disabled={!editMode || !changePhoneMode}
                  
                      style={{ width: "405px", marginRight: '25px' }}
                    />
                    <TextField
                      label="Confirm Change Number"
                      margin="normal"
                      value={formik.values.confirmPhoneNumber}
                      onChange={(e) => handleFieldChange(e, "confirmPhoneNumber")}
                    
                      disabled={!editMode || !changePhoneMode}
                   
                      style={{ width: "420px" }}
                    /> 
                  </>
                )}
              </>
            )}
          </DialogContent>

          {editMode && (
            <DialogActions sx={{ justifyContent: "center", marginBottom: '5px', marginTop: '-10px' }}>
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{
                  width: "150px",
                  height: "45px",
                  justifyContent: "center",
               
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
  }}