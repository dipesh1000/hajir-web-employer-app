'use client';
import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

let hembrgerList = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Company',
    url: '/dashboard/company',
  },
  {
    name: 'Create Company',
    url: '/dashboard/company/createcompany',
  },
];

const Hamburger = () => {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
        '& > a:hover': { color: 'red' },
      }}
    >
      {hembrgerList.map((item, idx) => {
        return (
          <Box
            sx={{ alignItems: 'center', display: 'flex', gap: 2 }}
            key={idx + 1}
          >
            <Link
              href={`${item.url}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{
                  color: '#22408B',
                  fontWeight: `${pathname === item.url ? '700' : '300'}`,
                  fontSize: '16px',
                  fontStyle: 'normal',
                  letterSpacing: '0.15px',
                }}
              >
                {item.name}
              </Typography>
            </Link>
            {hembrgerList.length > idx + 1 && '/'}
          </Box>
        );
      })}
    </div>
  );
};

export default Hamburger;
