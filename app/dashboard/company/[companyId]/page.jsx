"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import FirstPageEmployee from "@/components/employee/FirstPageEmployee";
import EmployeeTable from "@/components/employee/employeetable.jsx/EmployeeTable";
import CompanyFormFirst from "@/components/company/CompanyList";
import FirstPageCompany from "@/components/company/CreateCompanyCard";
import EmployeeFormFirst from "@/components/employee/EmployeeFormFirst";
import { useGetCandidatesQuery } from "@/services/api";

export default function CompanyDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { companyId } = useParams();
  console.log("companyId:", companyId); // Log the companyId

  const {
    data: candidateData,
    isLoading,
    refetch,
  } = useGetCandidatesQuery(companyId); // Pass companyId to the query
  // console.log("use client", candidateData, isLoading);
  console.log(candidateData?.data?.active_candidates, "active_candidates");
  console.log(candidateData?.data?.inactive_candidates, "inactive_candidates");

  const hasEmployees =
    (candidateData?.data?.active_candidates?.length || 0) +
      (candidateData?.data?.inactive_candidates?.length || 0) >
    0;
  return (
    <div>
      {/* {showFirstPageEmployee ? (
        <EmployeeTable />
      ) : (
        <FirstPageEmployee companyId={companyId} />
      )} */}
      {hasEmployees ? <FirstPageEmployee /> : <EmployeeFormFirst />}

      {/* <EmployeeTable /> */}
    </div>
  );
}
