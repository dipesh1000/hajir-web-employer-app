'use client';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { TextField, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import ScrollDialog from '@/components/Auth/ScrollDialog';
import { postRequest } from '@/services/ApiRequestService';

// Styled components
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  boxShadow: 'none',
  elevation: 0,
  background: 'transparent',
}));

const LogoContainer = styled('div')({
  marginBottom: '16px',
});

// Validation schema
const validationSchema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^\+?\d{10,}$/,
      'Invalid phone number. Must be at least 10 digits'
    ),
});

// Main component
export default function Signin() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Use media query hook
  const isScreenSmall = useMediaQuery('(max-width:900px)');

  const formik = useFormik({
    initialValues: {
      phone: '9808426215',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (buttonClicked) {
          return;
        }

        setButtonClicked(true);
        const apiResponse = await postRequest(`/employer/register`, values);

        if (!apiResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await apiResponse.json();

        if (data.status === 'success') {
          alert(`Successfully Registered.  \n Your OTP is: ${data.data.otp}`);
          router.push(`/otp?phone=${values.phone}&otp=${data.data.otp}`);
        } else {
          console.error('Registration failed. Message:', data.message);
        }
      } catch (error) {
        console.error('Error during API request:', error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Apply styles to the image */}
          <Image
            src="/auth/login.png"
            width={950}
            height={1000}
            alt="Logo"
            style={{
              // ...styles.image,
              display: isScreenSmall ? 'none' : 'block',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </LogoContainer>
            <div>
              <h2>Authentication</h2>
              <p style={{ whiteSpace: 'pre-line' }}>
                Salary calculation made easy, track your
                <br />
                staffs overtime, leave day, late day, and
                <br />
                live daily wages interactive reportss.
              </p>
              <Image
                src="/auth/login-min.png"
                width={150}
                height={150}
                alt="Logo"
              />
            </div>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                placeholder="+977 9841234567"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <Button
                variant="contained"
                type="submit"
                disabled={buttonClicked}
              >
                Login
              </Button>
            </Box>

            <p style={{ whiteSpace: 'pre-line', marginTop: '8px' }}>
              We will send you a one-time password on this mobile number
            </p>

            <p style={{ whiteSpace: 'pre-line' }}>
              I have read and agree to the{' '}
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={handleOpen}
              >
                Terms & Services
              </span>
            </p>

            <ScrollDialog open={open} onClose={handleClose} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
