"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetDailyCompanyCandidateReportQuery } from "@/services/api";
const PerformaceReport = () => {
  const { candidateId, companyId } = useParams();

  const { data: dailyCompanyCandidateReport } =
    useGetDailyCompanyCandidateReportQuery({
      company_id: companyId,
      candidate_id: candidateId,
    });

  console.log(candidateId);
  console.log(companyId);

  console.log(dailyCompanyCandidateReport);
  return <div>my id {candidateId}</div>;
};

export default PerformaceReport;
