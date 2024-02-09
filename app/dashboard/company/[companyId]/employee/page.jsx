"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useGetCandidatesQuery } from "@/services/api";
import { setCompanies } from "@/redux/employerSlice";
import CreateCompanyCard from "@/components/company/CreateCompanyCard";
import CompanyList from "@/components/company/CompanyList";
import { useParams } from "next/navigation";

export default function MainDashboard() {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const { data: candidateData, isLoading } = useGetCandidatesQuery(companyId); // Pass companyId to the query
  console.log("use client", candidateData, isLoading);
  // dispatch(setCompanies(companiesData));

  // Check if the user has any companies
  // const hasCandidate =
  //   (companiesData?.data?.active_companies?.length || 0) +
  //     (companiesData?.data?.inactive_companies?.length || 0) >
  //   0;

  return (
    <div>
      <CompanyList />
      hi
      {/* {hasCandidate ? <CompanyList /> : <CreateCompanyCard />} */}
    </div>
  );
}
