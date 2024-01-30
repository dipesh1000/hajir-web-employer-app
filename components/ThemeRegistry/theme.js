import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#22408B',
      },
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              backgroundColor: '#60a5fa',
            }),
          }),
        },
      },
    },
  },
  enUS
);

export default theme;
