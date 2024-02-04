// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hardcodedToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFjNzE4ZmNiZGFhNmQ0ODFhMWI5NWZjZjBmZjVmNTFmZTlhZmU3MzYzNmQ3MGY4OWIxNDk4OGQzZTBiMDkwOWZmZjEyNzg5MTFmZDkwZWEiLCJpYXQiOjE3MDY4NDA0OTEuNjI0MTg0LCJuYmYiOjE3MDY4NDA0OTEuNjI0MTksImV4cCI6MTczODQ2Mjg5MS42MjIyNjQsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.m4vxba52M2fsaV27ShViUeZ6wGT-TTm5e0jcW1pVfMlmsYD2QKofRgvrHF63F_SuGJr3R_MNJAzMjuFQDvGlU2J8kd2JLYdo_bgl3gFYWp5dt4Kj7Nr5pTFzSNjjjv_j-i0jSehtsSv3goG9dyN6aVTQL1Du_GNrS4U56g4JCcr4l5GoVNNBdbEnj0BARn0EUy32ho508Obp6bSesT7yQwELN53g70C6Iom_fLzgzDUupa_EgzLKRjukaSxx-TatVhUGSfBrEKDkyPMBe5gJxsydFPwkjbTyIqLD8r1GJYTcUuaDw2yB6bjNtmtl-E1zFwTfkUYvz6nHEYcmA5xhNm-WhHvFwMZx9dqXZO7i_JdAzUKWLBdAJBNMBL5D2vDvoYput9a4r41HS2DPzEpb2stMIQpELE_qvtll1bqZjQwUmLTw89QcbxWaMXCNbzaV0gXn0aLQUaX6iES9EftY8tHhnXYtWb-ynM_PWo6wXvDEnN0BS9Tgdlpe-YTQ136mH-sKy3-7pJS4KYzS1P-hUoY5QzH6MFJBPHnn7vQqTP-7tfWobnYeCnXJys0kIRmPMc34eH9ALXQeEBq4nBl6i6w6lbdBnvhHdE9nDDNKJBZl_D218slWOilWoWlG6h-GbrS8Oih3ZuhhrTNHZz-ewL1Gpwkeehbd5zzD6-6tp_g";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hajirappv2.an4soft.com/api/v2/",
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
    // updateProfile: builder.mutation({
    //   query: (profileData) => ({
    //     url: "employer/profile-update",
    //     method: "POST",
    //     body: profileData,
    //   }),
    // }),

    // Change Phone Number
    // changePhoneNumber: builder.mutation({
    //   query: (phoneNumberData) => ({
    //     url: "employer/change-phonenumber",
    //     method: "POST",
    //     body: phoneNumberData,
    //   }),
    // }),

    // Get Profile
    // getProfile: builder.query({
    //   query: () => "employer/get-profile",
    // }),

    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "employer/company/store",
        method: "POST",
        body: companyData,
      }),
    }),

    // updateCompany: builder.mutation({
    //   query: ({ company_id, companyData }) => ({
    //     url: `employer/company/update/${company_id}`,
    //     method: "PUT",
    //     body: companyData,
    //   }),
    // }),

    // deleteCompany: builder.mutation({
    //   query: (company_id) => ({
    //     url: `employer/company/destroy/${company_id}`,
    //     method: "DELETE",
    //   }),
    // }),

    // updateCompanyStatus: builder.mutation({
    //   query: ({ company_id, status }) => ({
    //     url: `employer/company/status/${company_id}`,
    //     method: "PUT",
    //     body: { status },
    //   }),
    // }),
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
  }),
});

export const {
  useGetDataQuery,
  useRegisterEmployeeMutation,
  useVerifyEmployeeOptMutation,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
  useGetProfileQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyStatusMutation,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useGetEmployerCompaniesQuery,
} = api;
