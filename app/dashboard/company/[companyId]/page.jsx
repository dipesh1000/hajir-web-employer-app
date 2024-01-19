"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import FirstPageEmployee from "@/components/employee/FirstPageEmployee";
import EmployeeTable from "@/components/dashboard/MainDashboard/EmployeeTable";

export default function CompanyDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { companyId } = useParams();
  console.log("companyId:", companyId); // Log the companyId

  const companies = useSelector((state) => state.company.companies) || [];
  const company = companies.find((c) => c.id === companyId);
  const employees = company ? company.employees : [];
  const showFirstPageEmployee = employees.length > 0;

  return (
    <div>
      {showFirstPageEmployee ? (
        <EmployeeTable />
      ) : (
        <FirstPageEmployee companyId={companyId} />
      )}
    </div>
  );
}
