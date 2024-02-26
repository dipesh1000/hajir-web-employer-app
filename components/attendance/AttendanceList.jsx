// // AttendaceList.js
// import React, { useState } from "react";
// import { Box, Grid } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import Button from "@mui/material/Button";
// import { useRouter } from "next/navigation";
// import { useGetEmployerCompaniesQuery } from "@/services/api";
// import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
// import CompanyTable from "../dashboard/MainDashboard/CompanyTable";

// const CompanyList = () => {
//   const router = useRouter();
//   const {
//     data: companiesData,
//     isLoading,
//     refetch,
//   } = useGetEmployerCompaniesQuery();

//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleChangeTab = (event, newValue) => {
//     refetch();

//     setSelectedTab(newValue);
//   };

//   const activeCompanies = companiesData?.data?.active_companies || [];
//   const inactiveCompanies = companiesData?.data?.inactive_companies || [];
//   const allCompanies = [...activeCompanies, ...inactiveCompanies];

//   const totalCount = allCompanies.length;
//   const activeCount = activeCompanies.length;
//   const inactiveCount = inactiveCompanies.length;

//   return (
//     <>
//       <Box>
//         <Grid
//           container
//           spacing={5}
//           columns={1}
//           sx={{ width: "100%", height: "100%" }}
//         >
//           <Grid item xs={8}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Box>
//                 <h2>Company</h2>
//               </Box>
//               <Box>
//                 <Button
//                   variant="contained"
//                   onClick={() =>
//                     router.push("/dashboard/company/createcompany")
//                   }
//                   startIcon={<AddIcon />}
//                 >
//                   Create Company
//                 </Button>
//               </Box>
//             </Box>
//             <h4>
//               <span>Dashboard</span> / <span>Company</span>
//             </h4>
//             <Box sx={{ flexGrow: 1 }}>
//               <TabsActiveInactive
//                 value={selectedTab}
//                 handleChange={handleChangeTab}
//                 totalCount={totalCount}
//                 activeCount={activeCount}
//                 inactiveCount={inactiveCount}
//               />
//               <Box
//                 sx={{
//                   display: selectedTab === 0 ? "block" : "none",
//                   height: "100%",
//                 }}
//               >
//                 <CompanyTable companies={allCompanies} statusFilter="all" />
//               </Box>
//               <Box
//                 sx={{
//                   display: selectedTab === 1 ? "block" : "none",
//                   height: "100%",
//                 }}
//               >
//                 <CompanyTable
//                   companies={activeCompanies}
//                   statusFilter="active"
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   display: selectedTab === 2 ? "block" : "none",
//                   height: "100%",
//                 }}
//               >
//                 <CompanyTable
//                   companies={inactiveCompanies}
//                   statusFilter="inactive"
//                 />
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={4}></Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default CompanyList;
