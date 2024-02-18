"use client";

import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const updateHoliday = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log(uploadedFile);
  };
  const handleDownload = (fileName) => {
    const filePath = `/${fileName}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          color: "#434345",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.25px",
        }}
      >
        Add Approval
      </Typography>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Button onClick={() => handleDownload("SpecialHoliday.xls")}>
            <Typography
              variant="body2"
              sx={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Click to download sample file (.xlsx)
            </Typography>
          </Button>{" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <Button variant="contained" component="label">
              Upload File
              <input type="file" onChange={handleFileChange} hidden />
            </Button>
            {isLoading && <LinearProgress value={uploadProgress} />}

            {/* Conditionally render the file name if uploadedFile is not null */}
            {file && (
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Uploaded File: {file.name}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography sx={{ flex: 1, marginRight: "10px" }}></Typography>
            <Button>Delete</Button>
          </Box>
          ={" "}
        </div>

        <div style={{ flex: 1 }}>
          <Image
            width="600"
            height="500"
            src="/dashboard/approval/addapprover.png"
            alt="Image"
          />
        </div>
      </div>
    </Box>
  );
};

export default updateHoliday;
