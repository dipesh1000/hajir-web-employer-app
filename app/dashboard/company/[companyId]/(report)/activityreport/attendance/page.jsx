import React from "react";
import AttendanceTableMockData from "@/components/mockData/AttendanceTableMockData";
import CommonActivityReportTable from "@/components/report/activityreport/CommonActivityReportTable";

const page = () => {
  const mockData = AttendanceTableMockData(); // Get the mock data
  const currentDate = new Date().toLocaleDateString();

  // Filter mockData to include only activities with "attendance" type
  const attendanceData = mockData.filter((activity) =>
    activity.types.includes("attendance")
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
          <h2>Attendee</h2>
          <h4>Attendee</h4>
        </div>
        {/* Today's date at the extreme right */}
        <div>
          <h4>{currentDate}</h4>
        </div>
      </div>

      <div>
        {/* Pass the filtered attendanceData to CommonActivityReportTable */}
        <CommonActivityReportTable
          data={attendanceData}
          departments={["Software", "Management", "Manager"]}
        />
      </div>
    </>
  );
};

export default page;
