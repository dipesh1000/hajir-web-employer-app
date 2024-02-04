"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetEmployerCompaniesQuery } from "@/services/api";
import { setCompanies } from "@/redux/employerSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { data: companiesData, isLoading } = useGetEmployerCompaniesQuery();

  useEffect(() => {
    if (companiesData) {
      console.log(companiesData);
      const activeCompanies = Array.isArray(companiesData.active_companies)
        ? companiesData.active_companies
        : [];

      const inactiveCompanies = Array.isArray(companiesData.inactive_companies)
        ? companiesData.inactive_companies
        : [];

      const allCompanies = [...activeCompanies, ...inactiveCompanies];
      dispatch(setCompanies(allCompanies));
    }
  }, [companiesData, dispatch]);

  return (
    <div>
      {!isLoading &&
        companiesData &&
        companiesData.data &&
        companiesData.data.active_companies && (
          <ul>
            {companiesData.data.active_companies.map((company) => (
              <>
                <li key={company.id}>{company.name}</li>
                <li key={company.id}>{company.id}</li>
                <li key={company.id}>{company.company_code}</li>
                <li key={company.id}>{company.holiday_type}</li>
                <li key={company.id}>{company.qr_path}</li>
                li
              </>
            ))}
          </ul>
        )}
    </div>
  );
};

export default Page;
