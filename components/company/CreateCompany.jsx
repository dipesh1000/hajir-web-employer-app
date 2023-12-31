import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DatePicker from "../form-components/DatePicker";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "left",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "stretch",
  height: "100%",
  gap: theme.spacing(2),
}));

const SickLeaveAllowed = [
  { label: "Weekly" },
  { label: "Monthly" },
  { label: "Yearly" },
];
const ProbationPeriod = [
  { label: "Weekly" },
  { label: "Monthly" },
  { label: "Yearly" },
];

export default function CreateCompany({ formik }) {
  const [response, setResponse] = useState({});
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, height: "100vh", padding: "10px" }}>
      <Typography variant="h5">Add New Company</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              fullWidth
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Staff Code</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                defaultValue="Auto"
              >
                <FormControlLabel
                  value="Auto"
                  control={<Radio />}
                  label="Auto"
                />
                <FormControlLabel
                  value="Custom"
                  control={<Radio />}
                  label="Custom"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Date Selection</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                defaultValue="English"
              >
                <FormControlLabel
                  value="English"
                  control={<Radio />}
                  label="English"
                />
                <FormControlLabel
                  value="Nepali"
                  control={<Radio />}
                  label="Nepali"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Salary Calculation</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                defaultValue="Calendar Days"
              >
                <FormControlLabel
                  value="Calendar Days"
                  control={<Radio />}
                  label="Calendar Days"
                />
                <FormControlLabel
                  value="30 Days"
                  control={<Radio />}
                  label="30 Days"
                />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <DatePicker
                title="Government Days"
                placeholder="Select a government day"
                dateFormat={(date) => new Date(date).toDateString()}
                onDelete={(newDates) =>
                  console.log("New government dates:", newDates)
                }
              />
            </Grid>
            <Grid container spacing={2}>
              <DatePicker
                title="Holidays Days"
                placeholder="Select a holidays day"
                dateFormat={(date) => new Date(date).toDateString()}
                onDelete={(newDates) =>
                  console.log("New holidays dates:", newDates)
                }
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Typography variant="h6" gutterBottom>
                    Sick Leave Allowed
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={SickLeaveAllowed}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sick Leave Allowed"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Probation Period
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={ProbationPeriod}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Probation Period" fullWidth />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <h2>Authentication</h2>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Sunday" />
            <FormControlLabel control={<Checkbox />} label="Monday" />
            <FormControlLabel control={<Checkbox />} label="Tuesday" />
            <FormControlLabel control={<Checkbox />} label="Wednesday" />
            <FormControlLabel control={<Checkbox />} label="Thursday" />
            <FormControlLabel control={<Checkbox />} label="Friday" />
            <FormControlLabel control={<Checkbox />} label="Saturday" />
          </FormGroup>
          <FormControl component="fieldset">
            <FormLabel component="legend">Access Network</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              defaultValue="Calendar Days"
            >
              <FormControlLabel
                value="Any Network"
                control={<Radio />}
                label="Any Network"
              />
              <FormControlLabel
                value="QR Code"
                control={<Radio />}
                label="QR Code"
              />
            </RadioGroup>
          </FormControl>
          <Button type="submit" onClick={formik.handleSubmit}>
            Create Company
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
