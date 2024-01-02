"use client";
import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserAuthForm = ({ onSubmit, formik, className, ...props }) => {
  formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Grid container spacing={2} className={className} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="phone"
            label="Phone Number"
            placeholder="+977 9841234567"
            name="phone"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Button type="submit" variant="contained" color="primary">
            Login
          </Button> */}
          {/* <Link href="/otp">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Link> */}

          <Button
            type="submit"
            // onClick={() => router.push('/signin')}
            // disabled={isLoading}
          >
            {/* {isLoading && null} */}
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default UserAuthForm;
