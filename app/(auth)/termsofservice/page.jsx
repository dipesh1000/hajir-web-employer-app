'use client';

import React from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TermsOfService = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Image alt="logo" width={100} height={50} src="/hajir-logo.png" />
        <Typography variant="h4">Hajir App Terms of Service</Typography>
        <Typography variant="body1">
          <strong> 1. Acceptance of Terms</strong>
          <br />
          Welcome to HajirApp! By using our mobile application the App, you <br/>
acknowledge and agree to comply with and be bound by the following Terms of Service
          Terms. <br/>If you do not agree to these Terms, please do not use the App.
        </Typography>
        <Typography variant="body1">
          <strong>2.Use of the App</strong>
          <br />
          <strong>2.1 License:</strong> We grant you a limited, non-exclusive,
          revocable <br/> license to use the App for your personal or business use.
          <br />
          <strong>2.2 User Account:</strong> To access certain features of the
          App, you may be required to create an <br/> account. You are responsible for
          maintaining the confidentiality of your <br/> account information.
          <br />
          <strong>2.3 Prohibited Activities:</strong> You agree not to engage in
          any <br/> prohibited activities, including but not limited to unauthorized
          access, use, or distribution of the <br/> App.
        </Typography>
        {/* Add other sections as needed */}
        <Typography variant="body1">
          <strong>3.Governing Law</strong>
          <br />
          These Terms are governed by and construed in accordance with the laws
          of 2062.
        </Typography>
        <Button variant="contained" onClick={() => router.push('/otp')}>
          OKay
        </Button>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
