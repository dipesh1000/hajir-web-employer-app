// ProfileCard.jsx
"use client";
// ProfileCard.jsx
// ProfileCard.jsx
import React, { useState } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const ProfileContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "10px",
  padding: "20px",
  borderRadius: "remove",
  cursor: "pointer", // Add cursor pointer for clickable effect
});

const ProfileCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "Biraj Karki",
    email: "birajkarki9@gmail.com",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    // Save changes
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    // Cancel editing
    setEditMode(false);
  };

  return (
    <>
      <ProfileContainer onClick={handleOpenModal}>
        <Avatar
          src="/avatar.png"
          sx={{
            width: 100,
            height: 100,
          }}
          alt="Profile Avatar"
        />
        <CardContent>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            {userData.name}
          </Typography>
          <Typography align="center" color="gray">
            {userData.email}
          </Typography>
        </CardContent>
      </ProfileContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {editMode ? (
            <Box>
              <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <input type="file" accept="image/*" />
              <Button onClick={handleSaveProfile}>Save Changes</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </Box>
          ) : (
            <Box>
              <Avatar
                src="/avatar.png"
                sx={{
                  width: 80,
                  height: 80,
                }}
                alt="Profile Avatar"
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                {userData.name}
              </Typography>
              <Typography color="gray">{userData.email}</Typography>
              <Button onClick={handleEditProfile}>Edit Profile</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCard;
