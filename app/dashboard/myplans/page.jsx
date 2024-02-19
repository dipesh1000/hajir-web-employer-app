"use client"
import React from "react";
import { Box } from '@mui/material';
import styled from "styled-components";
import BasicTabs, { CustomTabPanel } from "@/components/plansTab/PlansTab";

const Top=styled.div`
margin-top:-40px;
font-weight: 200;
`
const Mid=styled.div`
justify-content: center;
text-align: center;

`
const Tabb=styled.div`
`
const Planss=styled.div`
align-items: center;
justify-content: center;

`
const page = () => {
  return <div>
 <Box>
  <Top>
  <h1 style={{fontWeight:"500"}}> My Plans</h1>
  </Top>
  <div style={{display:'flex', flexDirection:'row'}}>
  <h2 style={{marginTop:"-20px", color:"gray", fontWeight:"300", marginRight:'18px'}}>Home</h2>
  <h2 style={{marginTop:"-20px", color:"gray", fontWeight:"300"}}>My Plans</h2>
  </div>
  <Mid>
<h1 style={{fontWeight:"500"}}>Choose the plan that is right for you</h1>
<h2 style={{ color:"gray", fontWeight:"300", marginTop:"-15px"}}>Unlock your endless opportunities</h2>
  </Mid>
  <Tabb>
  <BasicTabs></BasicTabs>
  </Tabb>
  <Planss>
  <CustomTabPanel></CustomTabPanel>
  </Planss>
 </Box>
  </div>;
};

export default page;
