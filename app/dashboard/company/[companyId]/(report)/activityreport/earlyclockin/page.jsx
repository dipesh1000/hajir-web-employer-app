import React from "react";
import AttendanceTableMockData from "@/components/mockData/AttendanceTableMockData";
import CommonActivityReportTable from "@/components/report/activityreport/CommonActivityReportTable";

const page = () => {
  const mockData = AttendanceTableMockData(); // Get the mock data
  const currentDate = new Date().toLocaleDateString();

  // Filter mockData to include only activities with "EarlyClockin" type
  const earlyClockInData = mockData.filter((activity) =>
    activity.types.includes("earlyClockIn")
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
          <h2>Early Clock In</h2>
          <h4>Early Clock In Report</h4>
        </div>
        {/* Today's date at the extreme right */}
        <div>
          <h4>{currentDate}</h4>
        </div>
      </div>

      <div>
        {/* Your CommonActivityReportTable goes here */}
        <CommonActivityReportTable
          data={earlyClockInData}
          departments={["Software", "Management", "Manager"]}
        />
      </div>
    </>
  );
};

export default page;
