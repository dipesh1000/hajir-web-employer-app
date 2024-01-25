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
  // Filter mockData to include only activities with "EarlyClockin" type
  const LateClockinData = mockData.filter((activity) =>
    activity.types.includes("LateClockin")
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
          <h2>Late Clock In</h2>
          <h4> Late CLock in Report</h4>
        </div>
        {/* Today's date at the extreme right */}
        <div>
          <h4>{currentDate}</h4>
        </div>
      </div>

      <div>
        {/* Your CommonActivityReportTable goes here */}
        <div>
          {/* Your CommonActivityReportTable goes here */}
          <CommonActivityReportTable
            data={LateClockinData}
            departments={["Software", "Management", "Manager"]}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
