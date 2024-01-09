import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme(
  {
    palette: {
      mode: "light",
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "info" && {
              backgroundColor: "#60a5fa",
            }),
          }),
        },
      },
    },
  },
  locales["en-US"]
);

export default theme;
