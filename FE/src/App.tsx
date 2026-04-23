import "./App.css";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import { PlirafyThemeProvider } from "./Components/Layout/PlirafyThemeProvider";
import { useOnlineStatus } from "./Components/Layout/useOnlineStatus";

function AppContent() {
  const isOnline = useOnlineStatus();

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>

      <Backdrop
        open={!isOnline}
        sx={{
          zIndex: 9999,
          color: "text.primary",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.46))",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.25,
            p: 4,
            borderRadius: "1.5rem",
            border: "1px solid var(--plirafy-divider)",
            background: "var(--plirafy-drawer-bg)",
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.42)",
            textAlign: "center",
          }}
        >
          <CircularProgress size={96} thickness={3.5} />
          <Typography sx={{ fontSize: "1.35rem", fontWeight: 800 }}>
            Trying to reconnect
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: "20rem" }}>
            Your connection appears to be offline. We paused the app until the
            internet is available again.
          </Typography>
        </Box>
      </Backdrop>

      <Snackbar
        open={!isOnline}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 10000 }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Trying to reconnect
        </Alert>
      </Snackbar>
    </>
  );
}

export default function App() {
  return (
    <PlirafyThemeProvider>
      <AppContent />
    </PlirafyThemeProvider>
  );
}
