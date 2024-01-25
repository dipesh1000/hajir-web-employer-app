"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import FirstPageEmployee from "@/components/employee/FirstPageEmployee";
import EmployeeTable from "@/components/employee/employeetable.jsx/EmployeeTable";
import CompanyFormFirst from "@/components/company/CompanyFormFirst";
import FirstPageCompany from "@/components/company/FirstPageCompany";
import EmployeeFormFirst from "@/components/employee/EmployeeFormFirst";

export default function CompanyDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { companyId } = useParams();
  console.log("companyId:", companyId); // Log the companyId

  // const companies = useSelector((state) => state.company.companies) || [];
  // const company = companies.find((c) => c.id === companyId);
  // const employees = company ? company.employees : [];
  // const showFirstPageEmployee = employees.length > 0;
  const hasEmployees = true;
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
/////////////////////////////////////////////////////
