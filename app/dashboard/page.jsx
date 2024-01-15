'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import FirstDashboard from '@/components/dashboard/FirstDashboard';
import MainDashboard from '@/components/dashboard/MainDashboard';

export default function HomePage() {
  // const isCompanyExists = true;

  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        {/* <Alert severity="info" sx={{ mt: 2, mb: 5, bgcolor: "white" }}>
          <AlertTitle> Welcome to Hajir 👋</AlertTitle>
          <AlertTitle> BIraj Karki</AlertTitle>
          Manage your company and employee with the best management system.
        </Alert> */}
        <FirstDashboard />

        {/* {isCompanyExists ? <MainDashboard /> : <FirstDashboard />} */}
      </div>
    </Box>
  );
}
