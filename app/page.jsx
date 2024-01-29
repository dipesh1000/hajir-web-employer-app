'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';
// Styles for components
const styles = {
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    // Hide the image on screens smaller than 600px
    '@media (maxWidth: 600px)': {
      display: 'none',
    },
  },
};
const Item = styled(Paper)(({ theme }) => ({
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

export default function BasicGrid() {
  const isScreenSmall = useMediaQuery('(max-width:900px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image
            width={950}
            height={925}
            alt="login image"
            src="/auth/login-image-default.png"
            style={{
              ...styles.image,
              display: isScreenSmall ? 'none' : 'block',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={60} alt="Logo" />
            </LogoContainer>
            <div>
              <h2>Login Here</h2>
              <p style={{ whiteSpace: 'pre-line' }}>
                Hajir will help you to manage your staff’s attendance,
                <br />
                payroll and personal report of your company.
              </p>
              <Image
                src="/auth/sign-min.png"
                width={175}
                height={175}
                alt="Logo"
              />
            </div>
            <Link href="/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 5, width: '120px' }}
              >
                Login
              </Button>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
