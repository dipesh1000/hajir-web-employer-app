// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { styled } from "@mui/material/styles";
// // import Box from "@mui/material/Box";
// // import Paper from "@mui/material/Paper";
// // import Grid from "@mui/material/Grid";
// // import Image from "next/image";
// // import Button from "@mui/material/Button";
// // import Link from "next/link";
// // import { useMediaQuery } from "@mui/material";

// // const BasicGridStyles = {
// //   container: {
// //     flexGrow: 1,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100vh",
// //     overflow: "hidden",
  
// //   },

// //   image: {
// //     objectFit: "contain",
// //     height: "100%", // Make the image occupy full height
// //     width: "100%", // Make the image occupy full width
// //   },
// // };
// // const Item = styled(Paper)(({ theme }) => ({
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: "center",
// //   color: theme.palette.text.secondary,
// //   display: "flex",
// //   flexDirection: "column",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   height: "100%",
// //   boxShadow: "none",
// //   elevation: 0,
// //   background: "transparent",
// // }));

// // const LogoContainer = styled("div")({
// //   marginBottom: "16px",
// // });

// // export default function BasicGrid() {
// //   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

// //   const images = [
// //     {
// //       src: "/auth/img1.png",
// //       width: 175,
// //       height: 190,
// //       alt: "First Image",
// //       paragraph:
// //         "Hajir will help you to manage your staffs <br/> attendance, payroll, and personal reports of your company.",
// //     },
// //     {
// //       src: "/auth/img2.png",
// //       width: 175,
// //       height: 190,
// //       alt: "Second Image",
// //       paragraph:
// //         "Candidate can login and logout on official hours <br/> and employer can notice staffs activities and generate reports.",
// //     },
// //     {
// //       src: "/auth/img3.png",
// //       width: 175,
// //       height: 190,
// //       alt: "Third Image",
// //       paragraph:
// //         "Salary calculation made easy, track your staffs overtime, <br/> leave day, late day, and live daily wages interactive reports.",
// //     },
// //   ];

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 2000);

// //     return () => clearInterval(intervalId);
// //   }, []); // Run the effect only once when the component mounts

// //   return (
// //     <Box sx={BasicGridStyles.container}>
// //       <Grid container>
// //         <Grid item xs={12} md={6}>
      
// //           <Image
// //             width={950}
// //             height={900}

// //             alt="login image"
// //             src="/auth/login-image-default.png"
// //             style={{
// //               ...BasicGridStyles.image,
// //               display: useMediaQuery("(max-width:900px)") ? "none" : "block",
            
// //               objectFit: "contain", height: "auto",
           
            
// //             }}
// //           />
       
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <Item>
// //             <LogoContainer>
// //               <Image src="/hajir-logo.png" width={140} height={60} alt="Logo" />
// //             </LogoContainer>
// //             <div>
// //               <h2>Login Here</h2>

// //               <div
// //                 dangerouslySetInnerHTML={{
// //                   __html: images[selectedImageIndex].paragraph,
// //                 }}
// //               />

// //               <Image
// //                 src={images[selectedImageIndex].src}
// //                 width={images[selectedImageIndex].width}
// //                 height={images[selectedImageIndex].height}
// //                 alt={images[selectedImageIndex].alt}
// //                 style={{ marginTop: "15px" }}
// //               />
// //             </div>
// //             <Link href="/login">
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 sx={{ mt: 5, width: "120px" }}
// //               >
// //                 Login
// //               </Button>
// //             </Link>
// //           </Item>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }

// "use client"
// "use client";
// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Image from "next/image";
// import Button from "@mui/material/Button";
// import Link from "next/link";
// import { useMediaQuery } from "@mui/material";

// const BasicGridStyles = {
//   container: {
//     flexGrow: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     overflow: "hidden",
//     objectFit:'cover',
//   },
//   imageContainer: {
//     width: "100", // Make the container occupy the full width
//     height: "100%", // Make the container occupy the full height
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     objectFit:'cover',
//   },
//   image: {
//     objectFit: "cover",
//     height: "100%", // Make the image occupy full height
//     width: "100%", // Make the image occupy full width
//   },
// };
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100%",
//   boxShadow: "none",
//   elevation: 0,
//   background: "transparent",
// }));

// const LogoContainer = styled("div")({
//   marginBottom: "16px",
// });

// export default function BasicGrid() {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const images = [
//     {
//       src: "/auth/img1.png",
//       width: 175,
//       height: 190,
//       alt: "First Image",
//       paragraph:
//         "Hajir will help you to manage your staffs <br/> attendance, payroll, and personal reports of your company.",
//     },
//     {
//       src: "/auth/img2.png",
//       width: 175,
//       height: 190,
//       alt: "Second Image",
//       paragraph:
//         "Candidate can login and logout on official hours <br/> and employer can notice staffs activities and generate reports.",
//     },
//     {
//       src: "/auth/img3.png",
//       width: 175,
//       height: 190,
//       alt: "Third Image",
//       paragraph:
//         "Salary calculation made easy, track your staffs overtime, <br/> leave day, late day, and live daily wages interactive reports.",
//     },
//   ];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, []); // Run the effect only once when the component mounts

//   return (
//     <Box sx={BasicGridStyles.container}>
//       <Grid container>
//         <Grid item xs={12} md={6}>
//           <div style={BasicGridStyles.imageContainer}>
//             <Image
//               width={950}
//               height={900}
//               alt="login image"
//               src="/auth/login-image-default.png"
//               style={BasicGridStyles.image}
           
//               objectFit='cover'
//             />
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Item>
//             <LogoContainer>
//               <Image src="/hajir-logo.png" width={140} height={60} alt="Logo" />
//             </LogoContainer>
//             <div>
//               <h2>Login Here</h2>

//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: images[selectedImageIndex].paragraph,
//                 }}
//               />

//               <Image
//                 src={images[selectedImageIndex].src}
//                 width={images[selectedImageIndex].width}
//                 height={images[selectedImageIndex].height}
//                 alt={images[selectedImageIndex].alt}
//                 style={{ marginTop: "15px" }}
//               />
//             </div>
//             <Link href="/login">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 5, width: "120px" }}
//               >
//                 Login
//               </Button>
//             </Link>
//           </Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { fontSize } from "@mui/system";

const BasicGridStyles = {
  container: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Adjusted minHeight instead of maxHeight
    objectFit: "cover",
    overflow: "hidden",
   
  },
  image: {
    display: "block",
    maxWidth: "100%",
    height: "auto", 
 
  },
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  boxShadow: "none",
  elevation: 0,
  background: "transparent",
}));

const LogoContainer = styled("div")({
  marginBottom: "16px",
});

export default function BasicGrid() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [
    {
      src: "/auth/img1.png",
      width: 175,
      height: 180,
      alt: "First Image",
      paragraph:
        "Hajir will help you to manage your staffs <br/> attendance, payroll, and personal reports of your company.",
        marginTop:'30px'
    },
    {
      src: "/auth/img2.png",
      width: 175,
      height: 180,
      alt: "Second Image",
      paragraph:
        "Candidate can login and logout on official hours <br/> and employer can notice staffs activities and generate reports.",
        marginTop:'30px'
    },

    {
      src: "/auth/img3.png",
      width: 175,
      height: 180,
      alt: "Third Image",
      paragraph:
        "Salary calculation made easy, track your staffs overtime, <br/> leave day, late day, and live daily wages interactive reports.",
        marginTop:'30px'
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once when the component mounts
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={BasicGridStyles.container}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          {!isMobile && ( // Hide the image on mobile screens
            <Image
              src="/auth/login-image-default.png"
              alt="login image"
              layout="responsive" // Making the image responsive
              width={isMobile ? 300 : 900} // Adjusted width based on screen size
              height={900}
              style={BasicGridStyles.image}
            
            />
          )}
        </Grid>
     
        <Grid item xs={12} md={6} sx={{ marginBottom: "80px" }} >
          <Item>
            <LogoContainer>
              <Image src="/hajir-logo.png" width={140} height={60} alt="Logo" />
            </LogoContainer>
            <div>
              {/* <h2 style={{fontSize: '18px'}}>Login Here</h2> */}

              {/* <div style={{fontSize:'14px'}}
                dangerouslySetInnerHTML={{
                  __html: images[selectedImageIndex].paragraph,
                }}
              /> */}
<h1 style={{ color: 'rgba(34, 64, 139, 0.87)' , fontWeight:'500', fontSize:'18px'}}>Smart attendance system</h1>
<div style={{fontSize:'14px', fontWeight:'400'}}
                dangerouslySetInnerHTML={{
                  __html: images[selectedImageIndex].paragraph,
                }}
              />
              <Image
                src={images[selectedImageIndex].src}
                width={images[selectedImageIndex].width}
                height={images[selectedImageIndex].height}
                alt={images[selectedImageIndex].alt}
                style={{ marginTop: "15px" }}
              />
            </div>
            <h1 style={{fontSize:'14px', fontWeight:'500', marginTop:'40px'}}>Login to manage your workspace</h1>
            <Link href="/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, width: "250px" }}
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