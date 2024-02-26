// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareDataForValidation } from "formik";

const hardcodedToken =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("token"))
    : null;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://veloxlabs.net/api/v2",
    // Include headers in each request
    prepareHeaders: (headers) => {
      const newHeaders = new Headers(headers);
      newHeaders.set("Authorization", `Bearer ${hardcodedToken}`);
      // newHeaders.set("Content-Type", "application/json");
      return newHeaders;
    },
  }),
  endpoints: (builder) => ({
    // getData: builder.query({
    //   query: () => "data",
    // }),

    //******************AUTH ***********************

    // Employee Registration
    registerEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "employer/register",
        method: "POST",
        body: employeeData,
      }),
    }),

    // Verify Employee OTP
    verifyEmployeeOpt: builder.mutation({
      query: (otpData) => ({
        url: "employer/verify-opt",
        method: "POST",
        body: otpData,
      }),
    }),

    // Profile Update
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "employer/profile-update",
        method: "POST",
        body: profileData,
        formData: true,
      }),
    }),

    // Get Profile
    getProfile: builder.query({
      query: () => "employer/get-profile",
    }),

    // ***************change number********************

    // getOtp to change Phone number
    getOtpChangeNumber: builder.mutation({
      query: (new_phone) => ({
        url: "employer/change-phone",
        method: "POST",
        body: new_phone,
      }),
    }),

    // /employer/phone-change-verify-otp
    verifyOtpChangeNumber: builder.mutation({
      query: ({ otp, new_phone }) => ({
        url: "employer/phone-change-verify-otp",
        method: "POST",
        body: { otp, new_phone },
      }),
    }),
    //****************** Company ***********************
    // createcompany
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "employer/company/store",
        method: "POST",
        body: companyData,
        formData: true,
      }),
    }),
    //update company
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

    // deleteCandidate
    deleteCandidate: builder.query({
      query: ({ companyId, candidate_id }) => ({
        url: `/employer/candidate/destroy/${companyId}/${candidate_id}`,
        method: "GET",
      }),
    }),
    //aproval list
    getApproval: builder.query({
      query: (companyId) => `employer/approver/list/${companyId}`,
    }),
    //approval assign
    assignApproval: builder.mutation({
      query: ({ companyId, candidate_id, status }) => ({
        url: `/employer/approver/store/${companyId}/${candidate_id}`,
        method: "POST",
        body: { status },
      }),
    }),
    //approval remove
    removeApproval: builder.mutation({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/approver/destroy/${company_id}/${candidate_id}`,
        method: "POST",
      }),
    }),

    // all gov holiday prepareDataForValidation
    getGovHoliday: builder.query({
      query: () => "employer/get-government-holiday-PDF",
    }),
    // all department
    getDepartment: builder.query({
      query: () => "/employer/all-departments",
    }),
    // generate qr code

    generateQrCode: builder.query({
      query: (company_id) => ({
        url: `employer/company/generate-new-qr/${company_id}`,
      }),
    }),
    // update custom holiday
    updateCustomHoliday: builder.mutation({
      query: ({ company_id, formData }) => ({
        url: `/employer/company/update-special-holiday/${company_id}`,
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),

    // ************* ATTENDACE REPORT ***************
    // candidate today report
    getAllCandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/all-candidate/${company_id}`,
      }),
    }),

    // attendance report today
    getAttendanceReportToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/${company_id}`,
      }),
    }),

    // inactive-candidate today
    // {{v2}}/employer/report/today/inactive-candidate/95

    getInactivecandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/inactive-candidate/${company_id}`,
      }),
    }),

    // active-candidate today
    getActivecandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/active-candidate/${company_id}`,
      }),
    }),

    // ************** LEAVE message ******************

    // get company candidate leaves
    getCompanyCandidateLeaves: builder.query({
      query: (company_id) => ({
        url: `/employer/candidateLeave/all/${company_id}`,
      }),
    }),

    // get leave details

    getLeaveDetails: builder.query({
      query: ({ leave_id, company_id }) => ({
        url: `/employer/candidateLeave/detail/${company_id}/${leave_id}`,
      }),
    }),

    // leave types

    getAllLeaveTypes: builder.query({
      query: (company_id) => ({
        url: `/employer/leave-type/all/${company_id}`,
      }),
    }),
    // updateCandidiateLeave

    updateCandidiateLeave: builder.mutation({
      query: ({ leave_id, payStatus, status }) => ({
        url: `employer/candidateLeave/change-status/${leave_id}`,
        method: "POST",
        body: { status, payStatus },
      }),
    }),

    // performance report
    getDailyCompanyCandidateReport: builder.query({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/report/daily-report/${company_id}/${candidate_id}`,
      }),
    }),
    //missing attendance
    updateMissingAttendance: builder.mutation({
      query: ({ MissingAttendanceData }) => ({
        url: `employer/candidate/missing-attendance-submit`,
        method: "POST",
        body: MissingAttendanceData,
      }),
    }),
    // missing leave

    updateMissingLeave: builder.mutation({
      query: ({ MissingLeaveData }) => ({
        url: `/employer/candidate/missing-leave-submit`,
        method: "POST",
        body: MissingLeaveData,
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useRegisterEmployeeMutation,
  useVerifyEmployeeOptMutation,
  useUpdateProfileMutation,
  useGetOtpChangeNumberMutation,
  useVerifyOtpChangeNumberMutation,
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
  useGetApprovalQuery,
  useAssignApprovalMutation,
  useRemoveApprovalMutation,
  useGetGovHolidayQuery,
  useGetDepartmentQuery,
  useGenerateQrCodeQuery,
  useUpdateCustomHolidayMutation,
  useGetAllCandidateTodayQuery,
  useGetAttendanceReportTodayQuery,
  useGetInactivecandidateTodayQuery,
  useGetActivecandidateTodayQuery,
  useGetCompanyCandidateLeavesQuery,
  useGetLeaveDetailsQuery,
  useUpdateCandidiateLeaveMutation,
  useGetDailyCompanyCandidateReportQuery,
  useUpdateMissingAttendanceMutation,
  useUpdateMissingLeaveMutation,
  useGetAllLeaveTypesQuery,
} = api;
