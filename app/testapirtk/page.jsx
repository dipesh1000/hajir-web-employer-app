"use client";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useCreateCompanyMutation } from "@/services/api";

const Page = () => {
  const formik = useFormik({
    initialValues: {
      name: "sdsdsdsdsdsdsdsds",
      code: "0", // Default value
      date_type: "English",
      holiday_type: "Custom",
      custom_holiday_file: null,
    },
    onSubmit: async (values) => {
      const apiUrl =
        "https://hajirappv2.an4soft.com/api/v2/employer/company/store";

      const token =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDVmMGVkODAxNzAwNjBjNWYyZTBmOWI0NDkwYWU2Njg0NTIzYzczZThkNjliMDg4ZGMwNzc3Zjc4MzQwN2NhZDQ0MDUxMjA3N2EyMGIzNWUiLCJpYXQiOjE3MDY0MTQ0MDkuMDY2NzgsIm5iZiI6MTcwNjQxNDQwOS4wNjY3ODYsImV4cCI6MTczODAzNjgwOS4wNjQ3NzEsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.f3PwHyWvQN0KJJpwquATJwn4LkGOl30Z5UBvCy0Zn4qooWJjIEiDCBIDNApwUO6eURuHd8v3FV7h8zQONPFEmjDiRW100kyNMC2KadS2YMr4-RLK3Tp3lG94XFzY3nq0v3ISvgBMvzmh2h0KOWo5VmVN4nHkU75nzTDBRzS4PH_08KLA_VXiSy3OBNx3OxDxiSMh1sNCshc0FHeBqrx_r5wIvg0q7TAim064fmOgPQBP1jlbL36aSQSCl3YqKxxR0ra4Udr5oMioo7pfKYgGte_QHXZ-HHYT_7LeYTi9jddWr3mPo1qfmZ_etRFi3t7NhahRFs2p6h-oeawqHIeajHU__k0iQwTcfrMdD2Xs09u9XE9MQaeBSjRO17oKJhm5E3-i7ZklpF2KGFYvdBnG56j3LuFPjhUNf5TbIGvIl-rCgWUb-_KrRpIFqnbWYXipYKIq_Dq54eZrJ0GyzcXU1oz6YD_T1FVgBHmM5quV5ScgCBtFzahL6sdugellBvTDHQyRwEEToKaii_f0h1q9DYxgklgEVqd29p07oClKFlLHLzYw1G4LtL3rJ_oirYstQnv3AjilT8dj2iEf6NnYqwvIPL_RpjD8LQIEbAqBv57dN5ftnqFfHKMGu5T9P2USu2uS7UPYDfGDWmsdWtt6_tFu2OiAGRcUkh0ZwH6WWnY";

      const myHeaders = {
        Accept: "application/json",
        Authorization: token,
      };

      const formdata = new FormData();
      Object.entries(formik.values).forEach(([key, value]) => {
        if (key === "custom_holiday_file" && value !== null) {
          formdata.append(key, value, value.name);
        } else {
          formdata.append(key, value);
        }
      });

      try {
        const response = await axios.post(apiUrl, formdata, {
          headers: myHeaders,
        });
        console.log("Company created successfully:", response.data);
      } catch (error) {
        console.error("Error during Axios request:", error.message);
      }
    },
  });

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label>Code:</label>
        <div>
          <input
            type="radio"
            id="code0"
            name="code"
            value="0"
            checked={formik.values.code === "0"}
            onChange={formik.handleChange}
          />
          <label htmlFor="code0">0</label>

          <input
            type="radio"
            id="code1"
            name="code"
            value="1"
            checked={formik.values.code === "1"}
            onChange={formik.handleChange}
          />
          <label htmlFor="code1">1</label>
        </div>

        <label>Date Type:</label>
        <input
          type="text"
          name="date_type"
          value={formik.values.date_type}
          onChange={formik.handleChange}
        />

        <label>Holiday Type:</label>
        <input
          type="text"
          name="holiday_type"
          value={formik.values.holiday_type}
          onChange={formik.handleChange}
        />

        <label>Custom Holiday File:</label>
        <input
          type="file"
          name="custom_holiday_file"
          onChange={(e) => {
            formik.setFieldValue(
              "custom_holiday_file",
              e.currentTarget.files[0]
            );
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
