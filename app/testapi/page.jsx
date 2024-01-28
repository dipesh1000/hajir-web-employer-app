"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    date_type: "",
    holiday_type: "",
    custom_holiday_file: null, // Assuming this is a file input
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, custom_holiday_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl =
      "https://hajirappv2.an4soft.com/api/v2/employer/company/store";
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjhlYjE2ODhjNzM1Mzk1MWU5NzE5MzU1OTgxMGQ5NDNiZTgyMTZkODYyMzdkNDlkYzgxOTY4MDU2YmUyYTc5YmU1YjcxMmRiMDc0NWFhYzQiLCJpYXQiOjE3MDYyOTUwMjguMTM3ODE3LCJuYmYiOjE3MDYyOTUwMjguMTM3ODI0LCJleHAiOjE3Mzc5MTc0MjguMTM1NjQ0LCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.G6hAps94po_4TSsQPubMpYmXGpUgrsqKmnWfLn2zDgIAMhrkpODqqJKnr1tQWCTLpus2sw_0l27qY_oLuiebZLjNYTiH2CJmB7PdJVHlYf4GDCjrcCRQJAr2h0qOftlpFYSHZNqCbVfcx4LbCrM9nXgKrN4-BINLdt7gt-5PfWZftjmYYQADzghR8_M3HdsF6RPZmw0ab4j3rsv4ZESEQ3YPdZvi-i_NCZSeXaAD5ODP1PIzlrnrnxO_nrm0DZvrSqfryH9UvqKXlN6s0qOVWjOYkYIvzHYQNz186Zu8GfUFW6AVl3cy6tJk4Q_-CbTvLoC_yqiiSfj30r9XmKzXlIHLR-tc9MN2r8iXJa8naptc6B7g-3iSmo5BLZ871RFU5JXt90ZMGybBE2PjJRyE1XhHj7UHMSP5W6VQiv8zjF6wxEIP71n4QAYkp5tc3xVcRAu16ZsgkOOZJfDMD6HJL2nFTpfcSjlYOBWjA14qR6IkDC247E2YeIDJ-XkNCskqZw8ED_C6NF8YWFzcYZZ8iRiwVDgjkK8eyj0lF9Q2TO9aObzPamcMgYWX_psaKB78PAiXzelD2cITQKHl1ongq6-NR1YTkrFvfPkybwHMANzKdNF0h8pvGYlNCx_CW7T_T6R3ZU8VU-wqPVXaC8XCIZe4UcLkW5yI5aHbSiRkBS0"; // Your token

    const myHeaders = {
      Accept: "application/json",
      Authorization: token,
      // Add other headers as needed
    };

    const formdata = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formdata.append(key, value);
    });

    try {
      const response = await axios.post(apiUrl, formdata, {
        headers: myHeaders,
      });
      console.log(response.data);

      // You can handle the response as needed, e.g., show a success message, redirect, etc.
    } catch (error) {
      console.error("Error during Axios request:", error.message);
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <label>Date Type:</label>
        <input
          type="text"
          name="date_type"
          value={formData.date_type}
          onChange={handleInputChange}
        />

        <label>Holiday Type:</label>
        <input
          type="text"
          name="holiday_type"
          value={formData.holiday_type}
          onChange={handleInputChange}
        />

        <label>Custom Holiday File:</label>
        <input
          type="file"
          name="custom_holiday_file"
          onChange={handleFileChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
