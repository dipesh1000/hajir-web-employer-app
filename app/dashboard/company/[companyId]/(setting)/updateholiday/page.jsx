"use client";
import { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useUpdateCustomHolidayMutation } from "@/services/api";
import { useParams } from "next/navigation"; // Assuming this is the correct import for useParams
import { useFormik } from "formik";

const UpdateHoliday = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateCustomHoliday] = useUpdateCustomHolidayMutation();
  const { companyId } = useParams(); // Corrected variable name to match the parameter name in the route

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      custom_holiday_file: null,
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("custom_holiday_file", values.custom_holiday_file);

        const { data } = await updateCustomHoliday({
          company_id: companyId, // Corrected variable name to match the parameter name in the mutation
          formData: formData,
        });
        console.log("Company id ", companyId); // Corrected variable name to match the parameter name in the route
        console.log("File successfully uploaded:", data);

        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading holiday file:", error);
        alert("Error uploading holiday file!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Function to handle file change
  const handleFileChange = (event) => {
    formik.setFieldValue("custom_holiday_file", event.target.files[0]);
  };

  // Function to handle file download
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
        Update Holiday
      </Typography>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
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
              <input
                type="file"
                onChange={handleFileChange}
                hidden
                accept=".xls,.xlsx"
              />
            </Button>
            {isLoading && <LinearProgress value={0} />}
            {formik.values.custom_holiday_file && (
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Uploaded File: {formik.values.custom_holiday_file.name}
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
            <Typography sx={{ flex: 1, marginRight: "10px" }}>
              <Button onClick={() => handleDownload("SpecialHoliday.xls")}>
                Download Current Holiday File (.pdf)
              </Button>
            </Typography>
            <Button type="submit" onClick={formik.handleSubmit}>
              Submit
            </Button>
          </Box>
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

export default UpdateHoliday;
