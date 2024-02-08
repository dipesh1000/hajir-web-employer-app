
"use client"
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';


export default function BasicGrid() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [
    {
      src: "/auth/img1.png",
      width: 175,
      height: 190,
      alt: "First Image",
      paragraph: "Hajir will help you to manage your staff’s <br/> attendance, payroll, and personal reports of your company.",
    },
    {
      src: "/auth/img2.png",
      width: 175,
      height: 190,
      alt: "Second Image",
      paragraph: "Candidate can login and logout on official hours <br/> and employer can notice staffs activities and generate reports.",
    },
    {
      src: "/auth/img3.png",
      width: 175,
      height: 190,
      alt: "Third Image",
      paragraph: "Salary calculation made easy, track your staffs overtime, <br/> leave day, late day, and live daily wages interactive reports.",
    },
  ];



  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once when the component mounts

  return (
    <Box sx={BasicGridStyles.container}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image
            width={950}
            height={900}
          
            alt="login image"
            src="/auth/login-image-default.png"
            style={{
              ...BasicGridStyles.image,
              display: useMediaQuery('(max-width:900px)') ? 'none' : 'block',
      
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
           
              <div dangerouslySetInnerHTML={{ __html: images[selectedImageIndex].paragraph }} />


              <Image
                src={images[selectedImageIndex].src}
                width={images[selectedImageIndex].width}
                height={images[selectedImageIndex].height}
                alt={images[selectedImageIndex].alt}
                style={{"marginTop":"15px"}}
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
