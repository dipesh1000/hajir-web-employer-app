"use client";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useCreateCompanyMutation } from "@/services/api";

const Page = () => {
  const createCompanyMutation = useCreateCompanyMutation();
  const formik = useFormik({
    initialValues: {
      name: "sdsdsdsdsdsdsdsds",
      code: "0",
      date_type: "English",
      holiday_type: "Custom",
      custom_holiday_file: null,
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      Object.entries(formik.values).forEach(([key, value]) => {
        if (key === "custom_holiday_file" && value !== null) {
          formdata.append(key, value, value.name);
        } else {
          formdata.append(key, value);
        }
      });

      try {
        console.log("Data being sent:", values);

        const [mutateAsync] = createCompanyMutation;

        await mutateAsync(values);

        alert("Company added successfully!");

        resetForm();
      } catch (error) {
        console.error("Error adding company:", error);

        alert("Error adding company. Please try again.");
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
