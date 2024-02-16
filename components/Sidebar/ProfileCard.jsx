
"use client"
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
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
import * as yup from "yup";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "styled-components";
import { CalendarIcon } from "@mui/x-date-pickers";
import { BackdropProps } from "@mui/material/Dialog";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
} from "@/services/api";

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
  width: "100%";
  display: flex;
  flex-direction:row,
  gap: 5px,
  flex-direction:row,
  gap: 5px,
`;

const LeftColumn = styles.div`
  flex: 1;
justify-content: space-evenly,
align-items: center,
const LeftColumn = styles.div`
  flex: 1;
justify-content: space-evenly,
align-items: center,
`;

const RightColumn = styles.div`
const RightColumn = styles.div`
  flex: 1;
`;
const BlurBackdrop = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

export default function ProfileCard() {
  const getProfileQuery = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const profileData = getProfileQuery.data?.data;
  console.log("Profile Data:", profileData);
  console.log("Profile name:", profileData?.name);
  console.log("Profile Data:", profileData);

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

  // Check if profile data has been fetched successfully

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Alphanumeric value only"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    gender: yup.string().required("Please select "),
    birthdate: yup.string().required("Please select a date"),
    maritalStatus: yup.string().required("Please select marital status"),
    phone: yup.string().required("Please enter phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: profileData?.name,
      email: profileData?.email || "",
      gender: profileData?.gender || "",
      birthdate: profileData?.dob || "", // Assuming 'dob' is the field for birthdate
      maritalStatus: profileData?.maritalStatus || "",
      phone: profileData?.phone || "",
    },
    validationSchema: validationSchema,
    // onSubmit function
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log("Data being sent:", values);

        const [mutateAsync] = updateProfile();

        await mutateAsync(values);
        console.log("Company added successfully:", data);

        alert("Company added successfully!");
        // Reset the form
        resetForm();

        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error adding company:", error);

        // Show a user-friendly error message
        alert("Error adding company. Please try again.");
      }
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
  };
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ProfileContainer onClick={handleOpenDialog}>
          <Avatar
            src={profileData?.avatar || "/avatar.svg"}
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
            {formik.values.name}
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ textTransform: "none" }}
          >
            {" "}
            {formik.values.email}
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
                sx: { backdropFilter: avatarClicked ? "blur(10px)" : "none" },
              },
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "-10px",
                  fontWeight: "500",
                  marginBottom: "-30px",
                  fontSize: "26px",
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
              }}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent>
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
                      style={{
                        position: "absolute",
                        top: "90%",
                        left: "93%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                      }}
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
                        backdropFilter: avatarClicked ? "blur(90px)" : "none", // Increase the blur when avatar is clicked
                      },
                    },
                  }}
                />
              )}
              {!editMode && avatarClicked ? (
                <Dialog
                  open={avatarClicked}
                  onClose={() => setAvatarClicked(false)}
                  sx={{
                    padding: 0,
                    marginLeft: "170px",
                    top: "0%",
                    backgroundColor: "transparent",
                  }}
                  PaperProps={{ sx: { boxShadow: "none", borderRadius: "0" } }}
                >
                  <Avatar
                    src={uploadedImage || "/avatar.svg"}
                    sx={{
                      width: 229,
                      height: 218,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      backgroundColor: "inherit",
                      padding: 0,
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
              <h1
                style={{
                  marginTop: "20px",
                  marginBottom: "-15px",
                  fontWeight: "300",
                  fontSize: "18px",
                }}
              >
                Personal Details
              </h1>
              <div style={{ display: "flex" }}>
                <LeftColumn sx={{}}>
                  <FormControl sx={{ marginTop: "16px" }}>
                    <Select
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                      disabled={!editMode} // Disable select functionality based on editMode
                      sx={{
                        "& .MuiSelect-icon": {
                          color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
                        },
                        width: "100px",
                      }}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    value={formik.values.name} // Set value to empty string in edit mode
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    disabled={!editMode}
                    sx={{ marginLeft: "20px", width: "285px" }}
                    placeholder={editMode ? "Full name" : ""} // Always show "Full name" as placeholder
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
                          <IconButton edge="end">
                            <CalendarIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
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
                    <FormControl sx={{ width: "100%", marginTop: "16px" }}>
                      <Select
                        value={userData.maritalStatus}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            maritalStatus: e.target.value,
                          })
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
                      value={
                        userData.maritalStatus === "married"
                          ? "Married"
                          : "Unmarried"
                      }
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
                      <CheckCircleIcon
                        onClick={handleChangePhoneNumber}
                        style={{ marginRight: "10px", color: "rgb(0, 0, 139)" }}
                      />
                    ) : (
                      <CircleOutlinedIcon
                        onClick={handleChangePhoneNumber}
                        style={{ marginRight: "10px", color: "rgb(0, 0, 139)" }}
                      />
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
                        style={{ width: "405px", marginRight: "25px" }}
                      />
                      <TextField
                        label="Confirm Change Number"
                        margin="normal"
                        value={confirmPhoneNumber}
                        onChange={(e) => setConfirmPhoneNumber(e.target.value)}
                        style={{ width: "420px" }}
                      />
                    </>
                  )}
                </>
              )}
            </DialogContent>

            {editMode && (
              <DialogActions
                sx={{
                  justifyContent: "center",
                  marginBottom: "5px",
                  marginTop: "-10px",
                }}
              >
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
      </form>
    </>
  );
}


