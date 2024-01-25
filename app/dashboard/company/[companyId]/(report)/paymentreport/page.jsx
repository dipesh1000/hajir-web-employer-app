"use client";
import HeaderPaymentReport from "@/components/report/paymentreport/HeaderPaymentReport";
import TableLayoutPaymentReport from "@/components/report/paymentreport/TableLayoutPaymentReport";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderPaymentReport />
      <br />
      <br />
      <br />
      <TableLayoutPaymentReport />
    </>
  );
};

export default Page;
