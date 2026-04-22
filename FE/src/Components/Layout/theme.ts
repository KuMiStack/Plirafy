import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b0f1a",
      paper: "#121826",
    },
    primary: {
      main: "#7c5cff",
    },
    secondary: {
      main: "#3aa0ff",
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#121826",
          backgroundImage: "none",
          boxShadow: "0 0 18px rgba(124, 92, 255, 0.15)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 10,
          textTransform: "none",
          paddingTop: 10,
          paddingBottom: 10,
        },
        contained: {
          color: "#ffffff",
          background: "linear-gradient(90deg, #7c5cff, #3aa0ff)",
          boxShadow: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            "&:hover": {
              background: "linear-gradient(90deg, #6a4de0, #2f8ae6)",
              boxShadow: "0 0 12px rgba(124, 92, 255, 0.35)",
            },
          },
        },
      ],
    },

    MuiOutlinedInput: {
  styleOverrides: {
    root: {
      backgroundColor: "#1a2233",
      borderRadius: 10,
      transition: "all 0.2s ease",

      "& input": {
        color: "#e5e7eb",
      },

      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px #1a2233 inset",
        WebkitTextFillColor: "#e5e7eb",
        borderRadius: "10px",
      },

      "& input:-webkit-autofill:hover": {
        WebkitBoxShadow: "0 0 0 100px #1a2233 inset",
      },

      "& input:-webkit-autofill:focus": {
        WebkitBoxShadow: "0 0 0 100px #1a2233 inset",
      },

      "& fieldset": {
        borderColor: "#2f3b52",
      },
      "&:hover fieldset": {
        borderColor: "#7c5cff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3aa0ff",
        borderWidth: 1.5,
      },
    },
  },
},

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9ca3af",
          "&.Mui-focused": {
            color: "#3aa0ff",
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#e5e7eb",
        },
      },
    },
  },
});

export default theme;