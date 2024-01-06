// ProfileCard.jsx
"use client";
import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Image from "next/image";

const ProfileContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "10px",
  padding: "20px",
  borderRadius: "remove",
});

const ProfileCard = () => {
  return (
    <ProfileContainer>
      <Avatar
        src="/avatar.png"
        sx={{
          width: 100,
          height: 100,
          bgcolor: red[500],
        }}
        alt="hj"
      />
      <CardContent>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          Biraj Karki
        </Typography>
        <Typography align="center" color="gray">
          birajkarki9@gmail.com
        </Typography>
      </CardContent>
    </ProfileContainer>
  );
};

export default ProfileCard;
