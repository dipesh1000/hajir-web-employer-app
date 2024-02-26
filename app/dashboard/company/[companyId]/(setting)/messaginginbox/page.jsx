// messaging/page.jsx
import React from "react";
import { TextField, Typography } from "@mui/material";
import Messaging from "@/components/messaging/Messaging";

const MessagingPage = () => {
  return (
    <div>
      <div>
        <span style={{ fontWeight: "500", fontSize: "28px" }}>
          Message Inbox
        </span>
        <div
          style={{
            display: "flex",
            fontWeight: "200",
            flexDirection: "row",
            fontSize: "20px",
            marginTop: "-20px",
            color: "gray",
          }}
        >
          <p style={{ fontWeight: "200", marginRight: "10px" }}>Home</p>
          <p style={{ fontWeight: "200", marginRight: "10px" }}>Setting</p>
          <p style={{ fontWeight: "200" }}>Message</p>
        </div>
      </div>
      <TextField
        label="search message"
        variant="outlined"
        size="small"
        // onChange={handleSearchTextChange}
        // value={searchText}
      />{" "}
      <Typography
        style={{ marginBottom: "30px", marginTop: "20px", fontWeight: "500" }}
      >
        Messages
      </Typography>
      <Messaging style={{ marginBottom: "10px" }} />
    </div>
  );
};

export default MessagingPage;
