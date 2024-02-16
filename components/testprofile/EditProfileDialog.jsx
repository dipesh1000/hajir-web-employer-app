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
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import {
  useChangePhoneNumberMutation,
  useUpdateProfileMutation,
} from "@/services/api";
import LoopIcon from "@mui/icons-material/Loop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
const EditProfileDialog = ({ open, handleClose, profileData }) => {
  const updateProfile = useUpdateProfileMutation();
  const changePhoneNumber = useChangePhoneNumberMutation();
  const [changePhoneMode, setChangePhoneMode] = React.useState(false);
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
  const handleChangePhoneNumber = () => {
    setChangePhoneMode(!changePhoneMode);
  };
  const handleCloseDialog = () => {
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={{ textAlign: "center" }}>Profile</DialogTitle>
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
      <Avatar
        src={"/avatar.svg"}
        sx={{
          width: 100,
          height: 100,
          marginLeft: "400px",
        }}
        alt="Profile Avatar"
      />
      <Image
        src="/imageUpload.png"
        alt="Upload Image"
        layout="fixed"
        width={30}
        height={30}
        style={{
          position: "absolute",
          top: changePhoneMode ? "24%" : "28%",
          left: "53%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      />
      <Typography sx={{ marginLeft: "25px", marginTop: "25px" }}>
        Personal Details
      </Typography>
      <DialogContent sx={{ marginTop: "-20px" }}>
        <form onSubmit={formikEdit.handleSubmit} encType="multipart/form-data">
          <FormControl style={{ width: "120px", marginBottom: "20px" }}>
            <Select
              id="gender"
              name="gender"
              variant="outlined"
              value={formikEdit.values.gender}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
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
            sx={{ width: "450px", marginBottom: "20px" }}
          />
          <FormControl>
            <Select
              id="maritalStatus"
              name="maritalStatus"
              variant="outlined"
              value={formikEdit.values.maritalStatus}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)", // Change the color of the default dropdown icon to blue
                },
                width: "380px",
                marginLeft: "20px",
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
            value={formikEdit.values.phone}
            onChange={formikEdit.handleChange}
            sx={{ width: "450px" }}
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
