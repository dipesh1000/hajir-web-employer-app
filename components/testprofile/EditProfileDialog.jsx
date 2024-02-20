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
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import {
  useChangePhoneNumberMutation,
  useUpdateProfileMutation,
} from "@/services/api";
import LoopIcon from "@mui/icons-material/Loop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";

const EditProfileDialog = ({ open, handleClose, profileData }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const changePhoneNumber = useChangePhoneNumberMutation();
  const [changePhoneMode, setChangePhoneMode] = React.useState(false);
  const handleCloseDialog = () => {
    handleClose();
  };
  const formikEdit = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      title: profileData?.title || "Mr",
      dob: profileData?.dob || "",
      marital_status: profileData?.marital_status || "Married",
      uploadfile: profileData?.profile_image || null,
    },
    onSubmit: async (values) => {
      try {
        console.log("Form submitted:", values);
        console.log("Form name:", values.name);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("title", values.title);
        formData.append("dob", values.dob);
        formData.append("marital_status", values.marital_status);
        formData.append("uploadfile", values.uploadfile);
        //
        console.log("Form data:", formData);
        console.log("Form data:", formData.get("name"));

        // Iterate through entries
        for (const [key, value] of formData.entries()) {
          console.log(key, ":", value);
        }
        // Upload image separately if it's changed

        // const { data } = await updateProfile(formData);
        await updateProfile(formData);
        console.log("Profile updated successfully:", data);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile. Please try again.");
      }
    },
  });

  const handleChangePhoneNumber = () => {
    setChangePhoneMode(!changePhoneMode);
  };

  const handlePhotoChange = (event) => {
    formikEdit.setFieldValue("uploadfile", event.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={{ textAlign: "center" }}>Edit Profile</DialogTitle>
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
        <form onSubmit={formikEdit.handleSubmit} encType="multipart/form-data">
          <input
            id="photo"
            name="uploadfile"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo">
            <Avatar
              src={
                formikEdit.values.uploadfile instanceof File
                  ? URL.createObjectURL(formikEdit.values.uploadfile)
                  : profileData?.profile_image || ""
              }
              sx={{
                width: 100,
                height: 100,
                marginLeft: "380px",
                cursor: "pointer",
              }}
              alt="Profile Avatar"
            />
          </label>
          <Image
        src="/imageUpload.png"
        alt="Upload Image"
        layout="fixed"
        width={30}
        height={30}
     
        onClick={() => document.getElementById('photo').click()}
        style={{
          position: "absolute",
          top: changePhoneMode ? "26%" : "30%",
          left: "53%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      />
      <Typography sx={{ marginLeft: "25px", marginTop: "25px" }}>
        Personal Details
      </Typography>
          <FormControl style={{ width: "120px", marginBottom: "20px" }}>
            <Select
              id="title"
              name="title"
              variant="outlined"
              value={formikEdit.values.title}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
                marginTop: "5px",
              }}
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
            value={formikEdit.values.name}
            onChange={formikEdit.handleChange}
            sx={{
              width: "310px",
              marginLeft: "20px",
              marginBottom: "20px",
              marginTop: "5px",
            }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formikEdit.values.email}
            onChange={formikEdit.handleChange}
            sx={{
              marginTop: "5px",

              width: "380px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
          />
          <TextField
            id="dob"
            name="dob"
            label="Date of birth"
            variant="outlined"
            type="date"
            value={formikEdit.values.dob}
            onChange={formikEdit.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "450px", marginBottom: "20px" }}
          />
          <FormControl>
            <Select
              id="marital_status"
              name="marital_status"
              variant="outlined"
              value={formikEdit.values.marital_status}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
                width: "380px",
                marginLeft: "20px",
              }}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            variant="outlined"
            value={formikEdit.values.phone}
            onChange={formikEdit.handleChange}
            sx={{ width: "450px" }}
            disabled
          />

          <div style={{ display: "flex", alignItems: "center" }}>
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
                style={{ width: "450px", marginRight: "20px" }}
              />
              <TextField
                label="Confirm Change Number"
                margin="normal"
                style={{ width: "380px" }}
              />
            </>
          )}
        </form>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          marginBottom: "5px",
          marginTop: "-10px",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          onClick={formikEdit.handleSubmit}
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
    </Dialog>
  );
};

export default EditProfileDialog;
