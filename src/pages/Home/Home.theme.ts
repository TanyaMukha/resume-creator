import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#1f7775",
    // },
    // secondary: {
    //   main: "#FF8360",
    // },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          // color: "white",
          "&.MuiTypography-h1": {
            fontSize: "28px",
            fontWeight: 700,
          },
          "&.MuiTypography-h2": {
            fontSize: "20px",
            fontWeight: 700,
          },
          "&.MuiTypography-h3": {
            fontSize: "16px",
            fontWeight: 700,
          },
          "&.MuiTypography-h4": {
            fontSize: "14px",
            fontWeight: 700,
          },
          "&.MuiTypography-body1": {
            fontSize: "12px",
          },
        },
      },
    },
  },
});
