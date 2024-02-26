// Step1Component.jsx
"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import the icon you want to use



const Step1Component = ({ formik, validationErrors }) => {
  const isFormIncomplete =
    Object.keys(validationErrors).length > 0 && formik.submitCount > 0;
  // Log form values when moving to Step 2
  // const moveToStep2 = () => {
  //   console.log("Step 1 Form Values:", formik.values);
  //   // Proceed to Step 2 logic...
  // };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 1,
          }}
        >
          {/* Staff Code */}
          <div>
            Staff Code <span style={{ color: "red" }}> *</span>
          </div>
          <TextField
            label="Staff Code"
            variant="outlined"
            sx={{ width: "500px" }}
            margin="normal"
            name="code"
            {...formik.getFieldProps("code")}
            error={
              ((formik.touched.code || formik.submitCount > 0) &&
                Boolean(formik.errors.code) &&
                formik.touched.code &&
                formik.errors.code) ||
              (!formik.touched.code &&
                formik.submitCount > 0 &&
                formik.errors.code) ||
              (validationErrors.code && validationErrors.code)
            }
            helperText={
              (formik.touched.code && formik.errors.code) ||
              (!formik.touched.code &&
                formik.submitCount > 0 &&
                formik.errors.code) ||
              (validationErrors.code && validationErrors.code)
            }
          />

          {/* Name Holder */}
          <div>
            Candidate details <span style={{ color: "red" }}> *</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <FormControl sx={{width:'100px', marginTop:'15px'}}>
              <InputLabel htmlFor="demo-simple-select-label">
                {/* Name Holder <span style={{ color: "red" }}> *</span> */}
              </InputLabel>
              <Select
                value={formik.values.name_holder}
                // label="Name Holder"
                onChange={formik.handleChange}
                name="name_holder"
                IconComponent={ArrowDropDownIcon} // Use ArrowDropDownIcon as the icon component
                sx={{ '& .MuiSvgIcon-root': { color: 'darkblue' } }}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </Select>
            </FormControl>

            {/* Full Name */}
            <TextField
              label="Full Name"
              variant="outlined"
              sx={{ marginLeft: 3, width: "380px", marginTop: 0.1 }}
              margin="normal"
              name="name"
              {...formik.getFieldProps("name")}
              error={
                ((formik.touched.name || formik.submitCount > 0) &&
                  Boolean(formik.errors.name) &&
                  formik.touched.name &&
                  formik.errors.name) ||
                (!formik.touched.name &&
                  formik.submitCount > 0 &&
                  formik.errors.name) ||
                (validationErrors.name && validationErrors.name)
              }
              helperText={
                (formik.touched.name && formik.errors.name) ||
                (!formik.touched.name &&
                  formik.submitCount > 0 &&
                  formik.errors.name) ||
                (validationErrors.name && validationErrors.name)
              }
            />
          </div>

          {/* Phone Number */}
          <TextField
          
            variant="outlined"
            sx={{ width: "505px", marginTop: 0.9 }}
            margin="normal"
            name="contact"
            {...formik.getFieldProps("contact")}
            error={
              ((formik.touched.contact || formik.submitCount > 0) &&
                Boolean(formik.errors.contact) &&
                formik.touched.contact &&
                formik.errors.contact) ||
              (!formik.touched.contact &&
                formik.submitCount > 0 &&
                formik.errors.contact) ||
              (validationErrors.contact && validationErrors.contact)
            }
            helperText={
              (formik.touched.contact && formik.errors.contact) ||
              (!formik.touched.contact &&
                formik.submitCount > 0 &&
                formik.errors.contact) ||
              (validationErrors.contact && validationErrors.contact)
            }
          />

          {/* Designation */}
          <TextField
            label="Designation"
            variant="outlined"
            sx={{ width: "700px", marginTop: 0.1 }}
            margin="normal"
            name="designation"
            {...formik.getFieldProps("designation")}
            error={
              ((formik.touched.designation || formik.submitCount > 0) &&
                Boolean(formik.errors.designation) &&
                formik.touched.designation &&
                formik.errors.designation) ||
              (!formik.touched.designation &&
                formik.submitCount > 0 &&
                formik.errors.designation) ||
              (validationErrors.designation && validationErrors.designation)
            }
            helperText={
              (formik.touched.designation && formik.errors.designation) ||
              (!formik.touched.designation &&
                formik.submitCount > 0 &&
                formik.errors.designation) ||
              (validationErrors.designation && validationErrors.designation)
            }
          />

          {/* Marriage Status */}
          <FormControl sx={{ width: "700px", marginTop: 0.1 }}>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Marriage Status <span sx={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              value={formik.values.marriage_status}
              label="Marriage Status"
              onChange={formik.handleChange}
              name="marriage_status"
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 20,
          }}
        >
          {/* Confirm Phone Number */}
          <TextField
            label="Confirm Phone Number"
            variant="outlined"
            sx={{ width: "505px", marginTop: 10.4, marginLeft:'-60px' }}
            margin="normal"
            name="confirmPhoneNumber"
            {...formik.getFieldProps("confirmPhoneNumber")}
            error={
              (formik.touched.confirmPhoneNumber || formik.submitCount > 0) &&
              Boolean(formik.errors.confirmPhoneNumber)
              //   &&
              //   formik.touched.confirmPhoneNumber &&
              //   formik.errors.confirmPhoneNumber) ||
              // (!formik.touched.confirmPhoneNumber &&
              //   formik.submitCount > 0 &&
              //   formik.errors.confirmPhoneNumber) ||
              // (validationErrors.confirmPhoneNumber &&
              //   validationErrors.confirmPhoneNumber)
            }
            helperText={
              (formik.touched.confirmPhoneNumber &&
                formik.errors.confirmPhoneNumber) ||
              (!formik.touched.confirmPhoneNumber &&
                formik.submitCount > 0 &&
                formik.errors.confirmPhoneNumber) ||
              (validationErrors.confirmPhoneNumber &&
                validationErrors.confirmPhoneNumber)
            }
          />

          {/* Departments */}
          <FormControl sx={{ width: "700px", marginTop: 2.8 }}>
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Departments <span sx={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              value={formik.values.departments}
              label="Departments"
              onChange={formik.handleChange}
              name="departments"
              IconComponent={ArrowDropDownIcon} // Use ArrowDropDownIcon as the icon component
              sx={{ '& .MuiSvgIcon-root': { color: 'darkblue' } }}
            >
              <MenuItem value="1">IT departments</MenuItem>
              <MenuItem value="2">Finance departments</MenuItem>
              <MenuItem value="3">Customer Support departments</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1Component;
