import Sidebar from "@/components/Sidebar/Sidebar";
import { Box } from "@mui/material";

export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attadance system ",
};
const DRAWER_WIDTH = 240;

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            ml: `${DRAWER_WIDTH}px`,
            mt: ["48px", "56px", "64px"],
            p: 3,
          }}
        >
          {children}
        </Box>{" "}
      </body>
    </html>
  );
}
