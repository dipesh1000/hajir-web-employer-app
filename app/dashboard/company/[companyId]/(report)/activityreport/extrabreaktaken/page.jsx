"use client";

import React from "react";
import AttendanceTableMockData from "@/components/mockData/AttendanceTableMockData";
import CommonActivityReportTable from "@/components/report/activityreport/CommonActivityReportTable";
import { useParams } from "next/navigation";
import { format } from "date-fns";

const Page = () => {
  const mockData = AttendanceTableMockData(); // Get the mock data
  const currentDate = format(new Date(), "MMMM dd, yyyy"); // Format the date
  const params = useParams();
  console.log(params);
  const extraBreakTakenData = mockData.filter((activity) =>
    activity.types.includes("extraBreakTaken")
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div>
          <h2>Extra Break Taken</h2>
          <h4> Extra Break Taken Report</h4>
        </div>
        <div>
          <h4>{currentDate}</h4>
        </div>
      </div>

      <div>
        <div>
          {/*  CommonActivityReportTable goes here */}
          <CommonActivityReportTable
            data={extraBreakTakenData}
            departments={["Software", "Management", "Manager"]}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
