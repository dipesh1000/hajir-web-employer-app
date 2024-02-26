"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DatePick from "@/components/employee/employeeSteps/DatePick";
import Image from "next/image";
import {
  useGetCandidatesQuery,
  useUpdateMissingAttendanceMutation,
} from "@/services/api";

const MissingAttendance = () => {
  const { companyId } = useParams();
  const { data: candidateData, isLoading: candidatesLoading } =
    useGetCandidatesQuery(companyId);
  const [updateMissingAttendanceMutation] =
    useUpdateMissingAttendanceMutation();

  function convertTo24HourFormat(time) {
    if (!time || typeof time !== "string") return "";
    const [hoursMinutes, ampm] = time.split(" ");
    const [hours, minutes] = hoursMinutes.split(":");
    let hours24 = parseInt(hours, 10);
    if (ampm === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (ampm === "AM" && hours24 === 12) {
      hours24 = 0;
    }
    return `${hours24.toString().padStart(2, "0")}:${minutes}`;
  }

  const formik = useFormik({
    initialValues: {
      start_time: "",
      end_time: "",
      company_id: companyId,
      candidate_id: "",
      attendance_date: "",
      overtime: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // values.start_time = convertTo24HourFormat(values.start_time);
        // values.end_time = convertTo24HourFormat(values.end_time);

        console.log("Missing candidate being updated:", values);
        // console.log("start time updated:", values.start_time);
        // console.log("endtime updated:", values.end_time);

        const { data } = await updateMissingAttendanceMutation({
          MissingAttendanceData: values,
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
          Missing Attendance
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
                    disablePortal
                    id="combo-box-demo"
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
                label="Enter Company Name"
                style={{ width: "20px" }}
                {...formik.getFieldProps("attendance_date")}
              />
              <Typography>Clock In</Typography>
              <TimePicker
                label="Clock In"
                {...formik.getFieldProps("start_time")}
              />
              <Typography>Clock Out</Typography>
              <TimePicker
                label="Clock Out"
                {...formik.getFieldProps("end_time")}
              />
              <Typography>Overtime</Typography>
              <TextField
                fullWidth
                label="e.g.: 2, 4, 5, 6"
                {...formik.getFieldProps("overtime")}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </div>
          {/* Image component */}
          <div style={{ flex: 1 }}>
            <Image
              width={600}
              height={500}
              src="/dashboard/missingAttendance/missingAttendance.png"
              alt="Missing Attendance Image"
            />
          </div>
        </div>
      </Box>
    </LocalizationProvider>
  );
};

export default MissingAttendance;
