"use client";
import React from "react";
import Header from "../Sidebar/Header/Header";
import Sidebar from "../Sidebar/MainSidebar";
import CompanyHeader from "../Sidebar/CompanyHeader/CompanyHeader";
import { useParams } from "next/navigation";

const HeaderCompany = (props) => {
  const { companyId } = useParams();
  return (
    <>
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <CompanyHeader companyId={companyId} />
    </>
  );
};

export default HeaderCompany;
