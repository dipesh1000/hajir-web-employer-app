'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    phone: '',
    date_type: '',
    holiday_type: '',
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
      console.error('Error during Axios request:', error.message);
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
