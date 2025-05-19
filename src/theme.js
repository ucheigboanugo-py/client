import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f8cff', // CallMed blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#00b894', // Accent green
    },
    background: {
      default: '#f8fafc',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',
    h5: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;