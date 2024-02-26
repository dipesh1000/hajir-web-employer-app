"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DatePick from "@/components/employee/employeeSteps/DatePick";
import Image from "next/image";
import {
  useGetAllLeaveTypesQuery,
  useGetCandidatesQuery,
  useUpdateMissingLeaveMutation,
} from "@/services/api";

const MissingAttendance = () => {
  const { companyId } = useParams();
  const { data: candidateData, isLoading: candidatesLoading } =
    useGetCandidatesQuery(companyId);
  const { data: getAllLeaveTypesData } = useGetAllLeaveTypesQuery(companyId);
  console.log(getAllLeaveTypesData, "pl");
  const [updateMissingLeaveMutation] = useUpdateMissingLeaveMutation();

  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const handleLeaveTypeChange = (event) => {
    setSelectedLeaveType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      start_time: "",
      end_time: "",
      company_id: companyId,
      candidate_id: "",
      leave_type_id: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Missing candidate being updated:", values);

        const { data } = await updateMissingLeaveMutation({
          MissingLeaveData: values,
        });

        alert("Candidate added successfully!");
        console.log("Candidate added successfully:", data);

        resetForm();
      } catch (error) {
        console.error("Error adding candidate:", error);
        alert("Error adding candidate. Please try again.");
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          Missing Leave
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {candidatesLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <>
                  <Typography>Name of employee</Typography>
                  <Autocomplete
                    options={
                      candidateData?.data?.active_candidates?.map(
                        (candidate) => ({
                          label: candidate.name,
                          value: candidate.id,
                        })
                      ) || []
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Missing Attendance" />
                    )}
                    value={
                      candidateData?.data?.active_candidates?.find(
                        (candidate) =>
                          candidate.id === formik.values.candidate_id
                      ) || ""
                    }
                    onChange={(event, newValue) => {
                      formik.setFieldValue(
                        "candidate_name",
                        newValue?.label || ""
                      );
                      formik.setFieldValue(
                        "candidate_id",
                        newValue?.value || ""
                      );
                    }}
                  />
                </>
              )}
              <Typography>Date Pick</Typography>
              <DatePick
                label="Enter date pick"
                style={{ width: "20px" }}
                {...formik.getFieldProps("attendance_date")}
              />

              <FormControl sx={{ width: "700px", marginTop: 2 }}>
                <InputLabel htmlFor="" sx={{ color: "black", marginBottom: 0 }}>
                  Leave Type
                </InputLabel>
                <Select
                  label="Leave Type"
                  autoWidth={false}
                  value={selectedLeaveType}
                  onChange={handleLeaveTypeChange}
                >
                  {/* <MenuItem value="">Leave type</MenuItem> */}
                  {/* Add options dynamically based on backend response */}
                  {getAllLeaveTypesData?.data?.leavetypes &&
                    getAllLeaveTypesData.data.leavetypes.map((dept) => (
                      <MenuItem key={dept.id} value={dept.title}>
                        {dept.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
              >
                Add
              </Button>
            </Box>
          </div>
          {/* Image component */}
          <div style={{ flex: 1 }}>
            <Image
              width={600}
              height={500}
              src="/dashboard/missingleave/missingleave.png"
              alt="Missing Attendance Image"
            />
          </div>
        </div>
      </Box>
    </LocalizationProvider>
  );
};

export default MissingAttendance;
