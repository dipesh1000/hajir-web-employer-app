// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hardcodedToken = JSON.parse(localStorage.getItem("token"));

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://veloxlabs.net/api/v2",
    // Include headers in each request
    prepareHeaders: (headers) => {
      const newHeaders = new Headers(headers);
      newHeaders.set("Authorization", `Bearer ${hardcodedToken}`);
      newHeaders.set("Content-Type", "application/json");
      return newHeaders;
    },
  }),
  endpoints: (builder) => ({
    // getData: builder.query({
    //   query: () => "data",
    // }),

    //******************AUTH ***********************

    // Employee Registration
    // registerEmployee: builder.mutation({
    //   query: (employeeData) => ({
    //     url: "employer/register",
    //     method: "POST",
    //     body: employeeData,
    //   }),
    // }),

    // Verify Employee OTP
    // verifyEmployeeOpt: builder.mutation({
    //   query: (otpData) => ({
    //     url: "employer/verify-opt",
    //     method: "POST",
    //     body: otpData,
    //   }),
    // }),

    // Profile Update
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "employer/profile-update",
        method: "POST",
        body: profileData,
      }),
    }),

    // Change Phone Number
    changePhoneNumber: builder.mutation({
      query: (phoneNumberData) => ({
        url: "employer/change-phonenumber",
        method: "POST",
        body: phoneNumberData,
      }),
    }),

    // Get Profile
    getProfile: builder.query({
      query: () => "employer/get-profile",
    }),
    //****************** Company ***********************

    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "employer/company/store",
        method: "POST",
        body: companyData,
        formData: true,
      }),
    }),

    updateCompany: builder.mutation({
      query: ({ company_id, companyData }) => ({
        url: `employer/company/update/${company_id}`,
        method: "POST",
        body: companyData,
        formData: true,
      }),
    }),
    // deletecompany
    deleteCompany: builder.mutation({
      query: (company_id) => ({
        url: `employer/company/destroy/${company_id}`,
        method: "POST",
      }),
    }),
    // update company status
    updateCompanyStatus: builder.mutation({
      query: ({ company_id, status }) => ({
        url: `employer/company/status/${company_id}`,
        method: "POST",
        body: { status },
      }),
    }),
    // All companies
    getEmployerCompanies: builder.query({
      query: () => "employer/company/employercompanies",
    }),

    // Get Active Company
    getActiveCompany: builder.query({
      query: () => "employer/company/active",
    }),

    // Get Inactive Company
    getInactiveCompany: builder.query({
      query: () => "employer/company/inactive",
    }),

    // Get Candidates for a company by company_id
    getCandidates: builder.query({
      query: (companyId) => `/employer/candidate/get-candidates/${companyId}`,
    }),

    // Create Candidate for a company by company_id
    createCandidate: builder.mutation({
      query: ({ candidateData, companyId }) => ({
        url: `employer/candidate/store/${companyId}`,
        method: "POST",
        body: candidateData,
      }),
    }),

    // Invite Candidate for a company by company_id
    inviteCandidate: builder.mutation({
      query: ({ candidate_id, status, companyId }) => ({
        url: `/employer/${companyId}/invitation/store`,
        method: "POST",
        body: { candidate_id, status },
      }),
    }),

    // deletecompany
    deleteCandidate: builder.query({
      query: ({ companyId, candidate_id }) => ({
        url: `/employer/candidate/destroy/${companyId}/${candidate_id}`,
        method: "GET", // Change method to GET
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useRegisterEmployeeMutation,
  useVerifyEmployeeOptMutation,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
  useGetProfileQuery,
  useDeleteCandidateQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCandidatesQuery,
  useInviteCandidateMutation,
  useCreateCandidateMutation,
  useUpdateCompanyStatusMutation,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useGetEmployerCompaniesQuery,
} = api;
