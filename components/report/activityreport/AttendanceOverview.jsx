"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EventIcon from "@mui/icons-material/Event";
import CircularProgress from "@mui/material/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { useParams } from "next/navigation";
import Link from "next/link";

const AttendanceOverview = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const yearOptions = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );

  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(0, index).toLocaleString("default", {
      month: "long",
    });
    return { value: month, label: month };
  });
  const { companyId } = useParams();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Mock data for attendance performance (90%)
  const attendancePercentage = 90;

  // Mock data for calendar (present, absent, leave)
  const calendarData = [
    { day: 1, status: "present" },
    { day: 2, status: "absent" },
    // ... more data
  ];

  // Mock data for attendance metrics
  const data = [
    {
      label: "Attendance",
      value: 90,
      color: "#0080000D",
      borderColor: "#008000",
      href: `/dashboard/company/${companyId}/activityreport/attendance/`,
    },
    {
      label: "Absent",
      value: 10,
      color: "#FF50500D",
      borderColor: "#FF5050",
      // backgroundColor: "white",
      href: `/dashboard/company/${companyId}/activityreport/absent/`,
    },
    {
      label: "Late Clock In",
      value: 5,
      color: "#22408B0D",
      borderColor: "#22408B",
      href: `/dashboard/company/${companyId}/activityreport/lateclockin/`,
    },
    {
      label: "Early clock in",
      value: 20,
      color: "#8000800D",
      borderColor: "#800080",
      href: `/dashboard/company/${companyId}/activityreport/earlyclockin/`,
    },
    {
      label: "Leave Taken",
      value: 10,
      color: "#FFA5000D",
      borderColor: "#FFA500",
      href: `/dashboard/company/${companyId}/activityreport/leavetaken/`,
    },
    {
      label: "Extra Taken",
      value: 5,
      color: "#EA00E10D",
      borderColor: "#EA00E1",
      href: `/dashboard/company/${companyId}/activityreport/extrabreaktaken/`,
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Year:</Typography>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            sx={{ ml: 2 }}
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Month:</Typography>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            sx={{ ml: 2 }}
          >
            {monthOptions.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" mb={2}>
            Attendance Performance
          </Typography>
          {/* Professional-looking circular progress */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 150,
            }}
          >
            <CircularProgress
              variant="determinate"
              value={50}
              color="success"
              size={175}
              thickness={4}
            />
            <Typography
              variant="h4"
              color="textPrimary"
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              50%
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <IconButton color="primary" aria-label="Download PDF">
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton color="primary" aria-label="Download Excel">
              <GetAppIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" mb={2}>
            Calendar View
          </Typography>
          {/* Full calendar view */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1,
              textAlign: "center",
            }}
          >
            {Array.from({ length: 31 }, (_, index) => (
              <Box
                key={index + 1}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor:
                    calendarData[index]?.status === "present"
                      ? "#4CAF50"
                      : calendarData[index]?.status === "absent"
                      ? "#FF5252"
                      : "#FFC107",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8em",
                  color: "white",
                  mb: 1,
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Box>
          <IconButton color="primary" aria-label="View Full Calendar">
            <EventIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        {data.map(({ label, value, color, borderColor, href }) => (
          <Box
            key={label}
            sx={{
              flex: "0 0 30%", // Set to 30% width for three boxes in one line
              backgroundColor: color,
              padding: 2,
              textDecoration: "none",
              borderRadius: 3,
              textAlign: "center",
              border: `1px solid ${borderColor}`,
              color: ` ${borderColor} `,
              marginBottom: 2,
              height: "100px",
            }}
          >
            <Typography variant="h6" mb={1}>
              <Link sx={{ decoration: "none" }} href={href}>
                {value}
              </Link>
            </Typography>
            <Typography variant="subtitle1">{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AttendanceOverview;
