import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AuthProvider from "@/context/AuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attendance system",
};

export default function RootLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <AuthProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </AuthProvider>
    </AppRouterCacheProvider>
  );
}
