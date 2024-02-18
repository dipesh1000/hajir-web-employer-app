"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Autocomplete,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import Image from "next/image";
import {
  useAssignApprovalMutation,
  useGetApprovalQuery,
  useGetCandidatesQuery,
  useRemoveApprovalMutation,
} from "@/services/api";

const AddApproval = () => {
  const { companyId } = useParams();
  const { data: candidateData, isLoading: candidatesLoading } =
    useGetCandidatesQuery(companyId);
  const { data: approvalData } = useGetApprovalQuery(companyId);
  const [assignApproval] = useAssignApprovalMutation();
  const removeApprovalMutation = useRemoveApprovalMutation();
  const [approvalName, setApprovalName] = useState("");
  const [approvals, setApprovals] = useState([]);

  const handleAddApproval = async () => {
    if (typeof approvalName === "string" && approvalName.trim() !== "") {
      const selectedCandidate = candidateData?.data?.active_candidates.find(
        (candidate) => candidate.name === approvalName
      );
      if (selectedCandidate) {
        const { id: candidateId } = selectedCandidate;
        console.log("candidateId", candidateId);
        try {
          const status = "Active";
          await assignApproval({
            candidateId,
            status,
            companyId,
          });

          setApprovals([...approvals, approvalName]);
          setApprovalName("");

          console.log("Approval added successfully:", approvalName);
          alert("Approval added successfully!");
        } catch (error) {
          console.error("Error adding approval:", error);
          alert(
            "Error adding approval. Please try again. Error: " + error.message
          );
        }
      } else {
        alert("Selected candidate not found.");
      }
    } else {
      alert("Approval name cannot be empty.");
    }
  };

  const handleDeleteApproval = async (approval) => {
    try {
      await removeApprovalMutation.mutateAsync({
        companyId,
        approvalId: approval.id,
      });
      setApprovals(approvals.filter((item) => item !== approval));
    } catch (error) {
      console.error("Error deleting approval:", error);
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

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div>
            <Typography variant="h6">List of candidates:</Typography>
            {candidateData?.data?.active_candidates.map((candidate, index) => (
              <Typography key={index}>
                Name: {candidate.name}, Candidate ID: {candidate.id}
              </Typography>
            ))}
          </div>

          {candidatesLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                candidateData?.data?.active_candidates?.map((candidate) => ({
                  label: candidate.name,
                  value: candidate.id,
                })) || []
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Add Approval" />
              )}
              value={approvalName}
              onChange={(event, newValue) => {
                setApprovalName(newValue?.label || "");
              }}
            />
          )}
          <Button variant="contained" onClick={handleAddApproval}>
            Add
          </Button>
          {approvalData?.data?.map((approval, index) => (
            <Box
              key={index}
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
              <Typography sx={{ flex: 1, marginRight: "10px" }}>
                ID: {approval.id}, Name: {approval.name}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDeleteApproval(approval)}
              >
                Delete
              </Button>
            </Box>
          ))}
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

export default AddApproval;
