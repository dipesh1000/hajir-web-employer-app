"use client";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import {
  useGetAllCandidateTodayQuery,
  useGetAttendanceReportTodayQuery,
  useGetInactivecandidateTodayQuery,
  useGetActivecandidateTodayQuery,
} from "@/services/api";
import { useParams } from "next/navigation";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100vh", // Set the height to 100% of the viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const HeaderAttendance = () => {
  const { companyId } = useParams();

  const {
    data: getAllCandidateToday,
    isLoading: isLoading1,
    refetch: refetch1,
  } = useGetAllCandidateTodayQuery(companyId);
  const {
    data: getAttendaceReportToday,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useGetAttendanceReportTodayQuery(companyId);
  const {
    data: getInactiveCandidateToday,
    isLoading: isLoading3,
    refetch: refetch3,
  } = useGetInactivecandidateTodayQuery(companyId);
  const {
    data: getActiveCandidateToday,
    isLoading: isLoading4,
    refetch: refetch4,
  } = useGetActivecandidateTodayQuery(companyId);

  // console.log(getAllCandidateToday, "getAllCandidateToday");
  console.log(getAttendaceReportToday, "ccccccccccccccgetAttendaceReportToday");
  // console.log(getInactiveCandidateToday, "getInactiveCandidateToday");
  // console.log(
  //   getActiveCandidateToday,
  //   "checkinggggggggggggggg getActiveCandidateToday"
  // );

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ width: "100%" }}
      spacing={{ xs: 1, sm: 2, md: 12 }}
    >
      <Item sx={{ backgroundColor: "#0080000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {getAttendaceReportToday?.data?.total_attendee}
        </Typography>
        <Typography variant="body1">Attended</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FF00000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {getAttendaceReportToday?.data?.absent}
        </Typography>
        <Typography variant="body1">Absent</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {getAttendaceReportToday?.data?.late}
        </Typography>
        <Typography variant="body1">Late</Typography>
      </Item>
    </Stack>
  );
};

export default HeaderAttendance;
