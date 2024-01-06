// "use client";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AuthProvider from "@/context/AuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
// import store from "@/redux/store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attadance system ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AuthProvider>
            <ThemeRegistry>
              {/* <Provider store={store}>  */}
              {children}
              {/* </Provider> */}
            </ThemeRegistry>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
