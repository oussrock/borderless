import { createTheme } from "@mui/material/styles";
import Icomoon from "../assets/font/icomoon.woff";

const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1025,
    lg: 1230,
    xl: 1920
  }
};

const baseTheme = createTheme({ breakpoints });

const theme = createTheme({
  breakpoints,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Icomoon';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Icomoon'), local('Icomoon-Regular'), url(${Icomoon}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
    }
  },
  typography: {
    fontFamily: ["Icomoon"].join(","),
    h1: {
      fontSize: "1.875rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "2.25rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2.25rem",
        lineHeight: "3.125rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "2.77rem",
        lineHeight: "3.625rem"
      }
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "2rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.75rem",
        lineHeight: "2.5rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.875rem",
        lineHeight: "2.625rem"
      }
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "2rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.375rem",
        lineHeight: "1.875rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
        lineHeight: "2rem"
      }
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "1.25rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.25rem",
        lineHeight: "1.75rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.375rem",
        lineHeight: "1.875rem"
      }
    },
    h5: {
      fontSize: "0.9375rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "1.25rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
        lineHeight: "1.75rem"
      }
    },
    h6: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "0.875rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1rem",
        lineHeight: "1.375rem"
      }
    },
    subtitle1: {
      fontSize: "1.875rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "2.25rem",
      textTransform: "uppercase",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2.25rem",
        lineHeight: "3.125rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "2.75rem",
        lineHeight: "3.626rem"
      }
    },
    subtitle2: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "1.625rem",
      textTransform: "uppercase",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.375rem",
        lineHeight: "1.875rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
        lineHeight: "2rem"
      }
    },
    body1: {
      fontSize: "1.125rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: "1.75rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
        lineHeight: "1.625rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
        lineHeight: "2.125rem"
      }
    },
    body2: {
      fontSize: "1.125rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: "1.75rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
        lineHeight: "1.625rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
        lineHeight: "2.125rem"
      }
    },
    button: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "1.375rem"
    },
    caption: {
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: "1.125rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      }
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: "0.875rem",
      textTransform: "uppercase",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      }
    }
  },
  palette: {
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF"
    }
  }
});

export default theme;
