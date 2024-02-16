// import theme from '@/GlobalThemeSettings';
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AuthProvider from "@/context/AuthContext";
import { Providers } from "@/redux/providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attadance system ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <ThemeRegistry>
              <Providers>{children}</Providers>
            </ThemeRegistry>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
