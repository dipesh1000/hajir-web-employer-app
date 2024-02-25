"use client"
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import DatePick from "./DatePick"; // Import DatePick component
import { useFormik } from "formik";

const Step4Component = ({ formik }) => {
  const handleAccessNetworkChange = (event) => {
    formik.setFieldValue("allowAccessNetwork", event.target.value);
  };

  const handleHoursChange = (increase) => {
    const [hours, minutes] = formik.values.working_hours.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes = increase ? totalMinutes + 10 : totalMinutes - 10;
    totalMinutes = (totalMinutes + 1440) % 1440;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");
    formik.setFieldValue("working_hours", `${formattedHours}:${formattedMinutes}`);
  };

  const handleOvertimeRatioFieldChange = (increase) => {
    const currentValue = parseFloat(formik.values.overtime_ratio);
    const newValue = increase ? currentValue + 0.1 : currentValue - 0.1;
    formik.setFieldValue("overtime_ratio", newValue.toFixed(1));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 1 }}>
          <Typography variant="body1">
            Joining Date <span sx={{ color: "red" }}> *</span>
          </Typography>
          <DatePick style={{ marginLeft: "23px" }} />

          <Typography sx={{ marginTop: 2 }} variant="body1">
            Overtime Hours <span sx={{ color: "red" }}>(Optional)</span>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.overtimeChecked}
                  onChange={(e) => formik.setFieldValue("overtimeChecked", e.target.checked)}
                  name="overtimeChecked"
                />
              }
            />
            <TextField
              sx={{ width: "540px", ml: 2 }}
              label="eg : 2 ,4 ,5 , 6"
              disabled={!formik.values.overtimeChecked}
              {...formik.getFieldProps("overtimeRatio")}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, width: "605px" }}>
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1">
                Sick Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.sickLeaveChecked}
                      onChange={(e) => formik.setFieldValue("sickLeaveChecked", e.target.checked)}
                      name="sickLeaveChecked"
                    />
                  }
                />
                <TextField
                  fullWidth
                  label="eg : 2 ,4 ,5 , 6"
                  sx={{ ml: 2 }}
                  {...formik.getFieldProps("sickLeave")}
                  disabled={!formik.values.sickLeaveChecked}
                />
              </Box>
            </Box>
            <Box sx={{ width: "50%", ml: 2 }}>
              <Typography variant="body1" style={{marginLeft:'50px'}}>
                Casual Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.casualLeaveChecked}
                      onChange={(e) => formik.setFieldValue("casualLeaveChecked", e.target.checked)}
                      name="casualLeaveChecked"
                      style={{marginLeft:'50px', marginRight:'-25px'}}
                    />
                  }
                />
                <TextField
                  fullWidth
                  label="eg : 2 ,4 ,5 , 6"
                  sx={{ ml: 2 }}
                  {...formik.getFieldProps("casualLeave")}
                  disabled={!formik.values.casualLeaveChecked}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: -0.7 }}>
          <Typography variant="body1" style={{marginLeft:'55px'}}>
            Allow Late Attendance <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.allowLateAttendanceChecked}
                  onChange={(e) => formik.setFieldValue("allowLateAttendanceChecked", e.target.checked)}
                  name="allowLateAttendanceChecked"
                  style={{marginLeft:'45px'}}
                />
              }
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                sx={{ height: "55px", marginRight:  -1.25, marginTop: 0.9}}
                variant="outlined"
                onClick={() => handleHoursChange(false)}
                disabled={!formik.values.allowLateAttendanceChecked}
              >
                -
              </Button>
              <TextField
                label="Working Hours"
                variant="outlined"
                sx={{ width: "333px", textAlign: "center" }}
                margin="normal"
                name="working_hours"
                inputProps={{ style: { textAlign: "center" } }}
                {...formik.getFieldProps("working_hours")}
                InputProps={{ disabled: !formik.values.allowLateAttendanceChecked }}
              />
              <Button
                variant="outlined"
                sx={{ height: "55px", marginLeft: -1.3, marginTop:0.9 }}
                onClick={() => handleHoursChange(true)}
                disabled={!formik.values.allowLateAttendanceChecked}
              >
                +
              </Button>
            </div>
          </Box>

          <Typography variant="body1" style={{ marginTop: '7px', marginLeft:'60px' }}>
            Over Time Ratio <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box>
            <TextField
              label="eg ratio: 2, 4, 5, 6"
              value={formik.values.overtimeRatio}
              onChange={formik.handleChange}
              name="overtimeRatio"
              sx={{ mt: -0.2, mb: 2, ml:7, width:'480px' }}
              disabled={!formik.values.overtimeChecked}
            />
          </Box>
          <Typography variant="body1" style={{marginLeft:'55px'}}>
            Allow access Network <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "50%",
              ml:7,
              height:'55px'

            }}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All"
              checked={formik.values.allowAccessNetwork === "all"}
              onChange={formik.handleChange}
              name="allowAccessNetwork"
            />
             <Divider style={{height:'55px', marginTop:'-11px'}}orientation="vertical" flexItem /> 
            <FormControlLabel
              value="QR code"
              control={<Radio />}
              label="QR code"
              checked={formik.values.allowAccessNetwork === "QR code"}
              onChange={formik.handleChange}
              name="allowAccessNetwork"
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4Component;
