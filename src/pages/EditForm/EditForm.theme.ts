import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(111, 168, 243)",
    },
    // secondary: {
    //   main: "#FF8360",
    // },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          marginTop: "24px",
          marginBottom: "16px",
          // "&.MuiTypography-h1": {
          //   fontSize: "28px",
          //   fontWeight: 700,
          // },
          "&.MuiTypography-h2": {
            fontSize: "36px",
            fontWeight: 700,
          },
          "&.MuiTypography-h3": {
            fontSize: "28px",
            fontWeight: 700,
          },
          "&.MuiTypography-h4": {
            fontSize: "20px",
            fontWeight: 700,
          },
          // "&.MuiTypography-body1": {
          //   fontSize: "12px",
          // },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "8px",
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          marginBottom: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "rgb(111, 168, 243)",
          textTransform: "none",
          fontSize: "16px",
          padding: "10px 16px",
          margin: "0 8px",
          "&:hover": {
            backgroundColor: "white",
            color: "rgb(111, 168, 243)",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.date-picker": {
            label: { left: "-12px" },
            input: { paddingLeft: 0 },
            ".MuiInputBase-root": { backgroundColor: "transparent" },
          },
        },
      },
    },
  },
});
