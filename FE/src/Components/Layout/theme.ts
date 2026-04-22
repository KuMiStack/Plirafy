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
      secondary: "#aaa",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#121826",
          boxShadow: "0 0 25px rgba(124, 92, 255, 0.2)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          color: "#fff",
          background: "linear-gradient(90deg, #7c5cff, #3aa0ff)",
          borderRadius: 10,
          transition: "0.3s",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            "&:hover": {
              background: "linear-gradient(90deg, #6a4de0, #2f8ae6)",
              boxShadow: "0 0 15px rgba(124, 92, 255, 0.5)",
            },
          },
        },
      ],
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#fff",
          },
          "& .MuiInputLabel-root": {
            color: "#aaa",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#3aa0ff",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#333",
            },
            "&:hover fieldset": {
              borderColor: "#7c5cff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3aa0ff",
            },
          },
        },
      },
    },
  },
});

export default theme;