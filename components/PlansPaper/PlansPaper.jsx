// "use client"
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import styled from 'styled-components';
// import CheckIcon from '@mui/icons-material/Check';
// import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';

// const Top=styled.div`
// height: 120px;
// font-size: 19px;
// `


// const Content = styled.div`
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   height: 340px;
//   gap: 5px;
//   align-items: flex-start;
//   font-size: 19px;
//   flex-wrap: wrap;
//   position: relative;

 
// `;



// export default function SimplePaper() {
//   const theme = useTheme();
//   // const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if screen width is less than or equal to 'sm' breakpoint

//   return (
//     <>
//     <Box
//       sx={{
//         display: 'flex',
     
//        flexDirection : {
//         xl:'row',
//         lg:'row',
//         md:'column',
// sm: 'column',
// xs: 'column',

//        },
       
    
//        alignItems:{
//         xl:'center',
//         lg:'center',
//         md:'center',
//         sm: 'center',
//         xs:'center',
//        },
//        alignContent:{

//         xl:'center',
//         lg:'center',
//         md:'center',
//         sm: 'center',
//         xs:'center',
//        },
//        marginLeft:'40px',
//        marginTop:"10px",
//         '& > :not(style)': {
//           m: 1,
        
//           height: "490px",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
         
//           }}
//       }
      
//     >
//      <Paper
//  sx={{
//  width:{
// xl:'700px',
// lg:'650px',

//    }
//  }}
// >
//           <Top  style={{
//                     backgroundColor:  '#1E90FF',
//                     height:"80px",
//                     justifyContent:"center",
//                     alignItems:"center",
//                     textAlign:"center",
//                     paddingTop:"10px",
//                     color:"white"
//                   }}>
// Basic (Forever) 
// <br/>
// Free- <b style={{
//    color: "white"
// }}>current plan</b>

//   </Top>
//   <Content 

//   >
//   <li   >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//   track live attendance
// </li>
// <li   >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     QR/all network setup
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Overtime setup
// </li>
// <li  >
//     <CheckIcon  style={{color:"green",  verticalAlign: 'middle'}}/>
//     Office timing setup
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Add candidates/company
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Custome leave setup
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     custom holiday setup
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Add missing attend/leave
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     allowance setup
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Setup weekly day off
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     setup allow late attend
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     salary calculation
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     payroll management
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
//     Add approver
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Performance reports
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Activities reports
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Payment reports
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Attendance reports
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Can export reports
// </li>
// <li  >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Many features+
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 1 company
// </li>
// <li >
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 5 employee
// </li>
//   </Content>
//   <Button variant="outlined" style={{borderColor:"green"}} >Get Started</Button>

//       </Paper>
//       <Paper
//  sx={{
//   width:{
//  xl:'700px',
//  lg:'650px',
  
//     },

//   }}
// >
//           <Top style={{
//                     backgroundColor:  '#1E90FF',
//                     height:"80px",
//                     justifyContent:"center",
//                     alignItems:"center",
//                     textAlign:"center",
//                     paddingTop:"10px",
//                     color: "white"
//                   }} >
//                     Standard (Recommended) <br/>
//                     2400/-<b>Yearly</b>
//                     </Top>
//                     <Content style={{
//                         marginTop:"-120px"
//                     }}>
//                     <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Everything from free plan
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 3 companies
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 33 employee
// </li>

//                     </Content>
//                     <Button variant="outlined" style={{borderColor:"green", marginTop:"120px"}}>Upgrade to standard</Button>

//       </Paper>
//       <Paper
//  sx={{
//   width:{
//  xl:'700px',
//  lg:'650px'
//     },

//   }}
// >
//                   <Top style={{
//                     backgroundColor:  '#1E90FF',
//                     height:"80px",
//                     justifyContent:"center",
//                     alignItems:"center",
//                     textAlign:"center",
//                     paddingTop:"10px",
//                     color:"white"
//                   }}>
// Premium (Enterprise) <br/>
// 6000/-<b>Yearly</b>
//   </Top>
//   <Content style={{
//    marginTop:"-120px",
//   }}>
//   <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Everything from free plan+
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 9 companies
// </li>
// <li>
//     <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
// Add 99 employee
// </li>
//   </Content>
//   <Button variant="outlined" style={{borderColor:"green", marginTop:"120px"}}>Upgrade to Premium</Button>

//       </Paper>
    
//     </Box>
//     </>
//   )
// } 


import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

const Top=styled.div`
height: 120px;
`
// const Content=styled.div`
// list-style: none;
// display: flex;
// flex-direction: column;
// justify-content: center;

// height: 340px;
// gap: 5px;
// align-items: flex-start; /* Align items at the start of the cross axis (top) */
// font-size: 15px;
// flex-wrap: wrap; /* Wrap items to the next row if there's not enough space */
// position: relative;


// li{
//   sx={{
//     height: "500px",
//     width: "250px",
//     '@media (max-width: 1512px)': {
//    fontSize:'8px'
//     },
//     '@media (max-width: 1280px)': {
//       fontSize:'8px'
//      // Reduce width to 50% minus margin
//     }
//   }}
// }




const Content = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 340px;
  gap: 5px;
  align-items: flex-start;

  flex-wrap: wrap;
  position: relative;


  }
`;



export default function SimplePaper() {
  const theme = useTheme();

  return (
    <>
    <Box
      sx={{
        display: 'flex',
     
       flexDirection : {
        xl:'row',
        lg:'column',
        md:'column',
sm: 'column',
xs: 'column',

       },
    
       alignItems:{
        sm: 'center',
        xs:'center',
       },
       marginLeft:'20px',
       marginTop:"10px",
        '& > :not(style)': {
          m: 1,
      width:'400px',
          height: "490px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
         
          }}
      }
      
    >

     <Paper
  sx={{
    height: "500px",
    width: "250px",
fontSize:{
  xl:'18px',
  lg:'16px',
  md:'17px',
  sm:'13px',
  xs:'10px',
},

  }}
>
          <Top  style={{
                    backgroundColor:  '#1E90FF',
                    height:"80px",
                    justifyContent:"center",
                    alignItems:"center",
                    textAlign:"center",
                    paddingTop:"10px",
                    color:"white"
                  }}>
Basic (Forever) 
<br/>
Free- <b style={{
   color: "white"
}}>current plan</b>

  </Top>
  <Content 

  >
  <li   >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
  track live attendance
</li>
<li   >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    QR/all network setup
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Overtime setup
</li>
<li  >
    <CheckIcon  style={{color:"green",  verticalAlign: 'middle'}}/>
    Office timing setup
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Add candidates/company
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Custome leave setup
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    custom holiday setup
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Add missing attend/leave
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    allowance setup
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Setup weekly day off
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    setup allow late attend
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    salary calculation
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    payroll management
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
    Add approver
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Performance reports
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Activities reports
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Payment reports
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Attendance reports
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Can export reports
</li>
<li  >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Many features+
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 1 company
</li>
<li >
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 5 employee
</li>
  </Content>
  <Button variant="outlined" style={{borderColor:"green"}} >Get Started</Button>

      </Paper>
   
      <Paper
      sx={{
fontSize:{
  xl:'18px',
  lg:'16px',
  md:'17px',
  sm:'13px',
  xs:'10px',
},}}
>
          <Top style={{
                    backgroundColor:  '#1E90FF',
                    height:"80px",
                    justifyContent:"center",
                    alignItems:"center",
                    textAlign:"center",
                    paddingTop:"10px",
                    color: "white"
                  }} >
                    Standard (Recommended) <br/>
                    2400/-<b>Yearly</b>
                    </Top>
                    <Content style={{
                        marginTop:"-120px"
                    }}>
                    <li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Everything from free plan
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 3 companies
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 33 employee
</li>

                    </Content>
                    <Button variant="outlined" style={{borderColor:"green", marginTop:"120px"}}>Upgrade to standard</Button>

      </Paper>
  
      <Paper
      sx={{
        fontSize:{
          xl:'18px',
          lg:'16px',
          md:'17px',
          sm:'13px',
          xs:'10px',
        },}}
>
                  <Top style={{
                    backgroundColor:  '#1E90FF',
                    height:"80px",
                    justifyContent:"center",
                    alignItems:"center",
                    textAlign:"center",
                    paddingTop:"10px",
                    color:"white"
                  }}>
Premium (Enterprise) <br/>
6000/-<b>Yearly</b>
  </Top>
  <Content style={{
   marginTop:"-120px",
  }}>
  <li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Everything from free plan+
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 9 companies
</li>
<li>
    <CheckIcon  style={{color:"green", verticalAlign: 'middle'}}/>
Add 99 employee
</li>
  </Content>
  <Button variant="outlined" style={{borderColor:"green", marginTop:"120px"}}>Upgrade to Premium</Button>

      </Paper>
    
    </Box>
    </>
  )
};
