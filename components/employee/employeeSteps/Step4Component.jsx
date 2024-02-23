
"use client"
import React, { useState } from "react";
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
import DatePick from "./DatePick";
import { useFormik } from "formik";


const Step4Component = ({formik}) => {
  const [overtimeChecked, setOvertimeChecked] = useState(true);
  const [overtimeRatio, setOvertimeRatio] = useState("");
  const [allowLateAttendanceChecked, setAllowLateAttendanceChecked] = useState(true);
  const [allowAccessNetwork, setAllowAccessNetwork] = useState("all");
  const [sickLeaveChecked, setSickLeaveChecked] = useState(true);
  const [sickLeave, setSickLeave] = useState("");
  const [casualLeaveChecked, setCasualLeaveChecked] = useState(true);
  const [casualLeave, setCasualLeave] = useState("");

  const handleAccessNetworkChange = (event) => {
    setAllowAccessNetwork(event.target.value);
  };

  const handleOvertimeRatioChange = (event) => {
    setOvertimeRatio(event.target.value);
  };
const handleworking_hoursChange = (decrease) => {
  const [hours, minutes] = formik.values.working_hours.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes;
  totalMinutes = decrease ? totalMinutes + 10 : totalMinutes -10;
  totalMinutes = (totalMinutes + 1440) % 1440;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  const formattedHours = String(newHours).padStart(2, "0");
  const formattedMinutes = String(newMinutes).padStart(2, "0");
formik.setFieldValue("working_hours", `${formattedHours}:${formattedMinutes}`);
};

  const handleOvertimeCheckedChange = (event) => {
    setOvertimeChecked(event.target.checked);
  };

  const handleAllowLateAttendanceChange = (event) => {
    setAllowLateAttendanceChecked(event.target.checked);
  };

  const handleSickLeaveChange = (event) => {
    setSickLeave(event.target.value);
  };

  const handleSickLeaveCheckedChange = (event) => {
    setSickLeaveChecked(event.target.checked);
  };

  const handleCasualLeaveChange = (event) => {
    setCasualLeave(event.target.value);
  };

  const handleCasualLeaveCheckedChange = (event) => {
    setCasualLeaveChecked(event.target.checked);
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
              control={<Checkbox checked={overtimeChecked} onChange={handleOvertimeCheckedChange} />}
            />
            <TextField
              sx={{ width: "540px", ml: 2 }}
              label="eg : 2 ,4 ,5 , 6"
              disabled={!overtimeChecked}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, width: "605px" }}>
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1">
                Sick Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControlLabel
                  control={<Checkbox checked={sickLeaveChecked} onChange={handleSickLeaveCheckedChange} />}
                />
                <TextField 
                  fullWidth 
                  label="eg : 2 ,4 ,5 , 6" 
                  sx={{ ml: 2 }} 
                  value={sickLeave}
                  onChange={handleSickLeaveChange}
                  disabled={!sickLeaveChecked}
                />
              </Box>
            </Box>
            <Box sx={{ width: "50%", ml: 2 }}>
              <Typography variant="body1" style={{marginLeft:'50px'}}>
                Casual Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControlLabel
                  control={<Checkbox checked={casualLeaveChecked} onChange={handleCasualLeaveCheckedChange}  style={{marginLeft:'50px', marginRight:'-25px'}}/>}
                />
                <TextField 
                  fullWidth 
                  label="eg : 2 ,4 ,5 , 6" 
                  sx={{ ml: 2 }} 
                  value={casualLeave}
                  onChange={handleCasualLeaveChange}
                  disabled={!casualLeaveChecked}
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
    control={<Checkbox checked={allowLateAttendanceChecked} onChange={handleAllowLateAttendanceChange} style={{marginLeft:'45px'}} />}
  />
  
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <Button
   sx={{ height: "55px", marginRight:  -1.25, marginTop: 0.9}}
              variant="outlined"
              onClick={() => handleworking_hoursChange(false)}
              disabled={!allowLateAttendanceChecked}
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
              InputProps={{ disabled: !allowLateAttendanceChecked }}
            />
            <Button
              variant="outlined"
              sx={{ height: "55px", marginLeft: -1.3, marginTop:0.9 }}
              onClick={() => handleworking_hoursChange(true)}
              disabled={!allowLateAttendanceChecked}
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
              value={overtimeRatio}
              onChange={handleOvertimeRatioChange}
              sx={{ mt: -0.2, mb: 2, ml:7, width:'480px' }}
              disabled={!overtimeChecked}
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
              checked={allowAccessNetwork === "all"}
              onChange={handleAccessNetworkChange}
            />
             <Divider style={{height:'55px', marginTop:'-11px'}}orientation="vertical" flexItem /> 
            <FormControlLabel
              value="QR code"
              control={<Radio />}
              label="QR code"
              checked={allowAccessNetwork === "QR code"}
              onChange={handleAccessNetworkChange}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4Component;

