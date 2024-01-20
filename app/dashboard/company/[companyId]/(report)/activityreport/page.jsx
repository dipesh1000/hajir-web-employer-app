import CompanyHeader from "@/components/Sidebar/CompanyHeader/CompanyHeader";
import ActivityReportHeader from "@/components/report/activityreport/ActivityReportHeader";
import AttendanceOverview from "@/components/report/activityreport/AttendanceOverview";
import React from "react";

const page = () => {
  return (
    <>
      <ActivityReportHeader />
      <AttendanceOverview />
      <h2>h</h2>
    </>
  );
};

export default page;
