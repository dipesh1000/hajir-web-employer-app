"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import CreateCompany from "@/components/company/CreateCompany";

const Company = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      officeHourStart: "10:00",
      officeHourEnd: "18:00",
      code: 1,
      calculationType: "calendar_days",
      networkIP: "192.168.10.1",
      governmentLeaveDates: [
        {
          leaveDate: "04/04/2017",
        },
        {
          leaveDate: "04/04/2018",
        },
      ],
      specialLeaveDates: [
        {
          leaveDate: "04/04/2017",
        },
        {
          leaveDate: "04/04/2018",
        },
      ],
      businessLeave: [1, 2],
      leaveDurationType: "Yearly",
      leaveDuration: 20,
      probationPeriod: 1,
    },
    onSubmit: async (values) => {
      try {
        // API request
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employer/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        // Check if the API request was successful
        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the API response
        const data = await apiResponse.json();

        // Handle the API response as needed
        console.log(data);

        // Log the data to the console
        console.log("Data sent to the API:", values);

        // Redirect or perform other actions based on the response
        if (data.status === "success") {
          alert(`Successfully Registered.  \n Your OTP is: ${data.data.otp}`);
          console.log("OTP:values", data.data.otp);
          router.push(`/signin?phone=${values.phone}&otp=${data.data.otp}`);
        } else {
          console.error("Registration failed. Message:", data.message);
        }
      } catch (error) {
        // Handle errors during API request
        console.error("Error during API request:", error.message);
      }
    },
  });

  // Render the CreateCompany component and pass formik as a prop
  return <CreateCompany formik={formik} />;
};

// Export the Company component
export default Company;
