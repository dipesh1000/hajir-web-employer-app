"use client";
import { useGetCandidatesQuery } from "@/services/api";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const AddApproval = () => {
  const { companyId } = useParams();
  console.log("companyId:", companyId); // Log the companyId
  const {
    data: candidateData,
    isLoading,
    refetch,
  } = useGetCandidatesQuery(companyId); // Pass companyId to the query
  // console.log("use client", candidateData, isLoading);
  console.log(candidateData?.data?.active_candidates, "active_candidates");

  const [approvalName, setApprovalName] = useState("");
  const [approvals, setApprovals] = useState([]);

  const handleAddApproval = () => {
    if (approvalName.trim() !== "") {
      setApprovals([...approvals, approvalName]);
      setApprovalName("");
    }
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

      {/* breadcrumb area */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Breadcrumb links */}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          {isLoading ? (
            // Render loading indicator or placeholder while data is loading
            <Typography>Loading...</Typography>
          ) : (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                candidateData?.data?.active_candidates?.name
                  ? candidateData.data.active_candidates.name.map((name) => ({
                      label: name,
                      value: name,
                    }))
                  : []
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Add Approval" />
              )}
            />
          )}

          <button onClick={handleAddApproval}>Add</button>
          {approvals.map((approval, index) => (
            <div key={index}>{approval}</div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {/* Replace 'imageUrl' with the URL of your image */}
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

export default AddApproval;
