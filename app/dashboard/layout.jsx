import Header from "@/components/Sidebar/Header/Header";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import { Box } from "@mui/material";

export const metadata = {
  title: "Hajir's ",
  description: "A smart attadance system ",
};
const DRAWER_WIDTH = 250;

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <MainSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
   
          ml: `${DRAWER_WIDTH}px`,
          mt: ["48px", "56px", "64px"],
          p: 3,
          overflow: "auto", // Make the main content scrollable
        }}
      >
        {children}
      </Box>
    </>
  );
}
