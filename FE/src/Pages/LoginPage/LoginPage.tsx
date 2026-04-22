import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../Components/Layout/AppLayout";
import PlirafyPhraseWhite from "../../assets/PlirafyPhraseWhite.png";
import PlirafyBackground from "../../assets/PlirafyBackground.png";
import { useLogin } from "./hooks/useLogin";

function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
          navigate("/homepage");
        },
        onError: (err) => {
          console.error("Login error:", err);
        },
      }
    );
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <AppLayout>
      {/* 🔥 BACKGROUND WRAPPER */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${PlirafyBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 🔥 DARK OVERLAY (so text is readable and not fighting your background) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(10,10,30,0.6), rgba(5,5,15,0.9))",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* 🔥 CONTENT */}
        <Box
          sx={{
            width: "min(100%, 34rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.75,
            py: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              component="img"
              src={PlirafyPhraseWhite}
              alt="Plirafy phrase white"
              sx={{
                position: "absolute",
                top: "-2.9rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(7.5rem, 17vw, 11rem)",
                zIndex: 2,
                filter: "drop-shadow(0 8px 25px rgba(124, 92, 255, 0.32))",
                pointerEvents: "none",
              }}
            />

            <Paper
              elevation={8}
              sx={{
                width: "100%",
                pt: "6.25rem",
                px: "clamp(1.1rem, 2.4vw, 2rem)",
                pb: "clamp(1.3rem, 2.4vw, 2rem)",
                borderRadius: "clamp(1.2rem, 2vw, 1.7rem)",
                border: "1px solid rgba(124, 92, 255, 0.16)",
                backdropFilter: "blur(12px)",
                background: "rgba(20, 20, 40, 0.55)",
                boxShadow: "0 0 30px rgba(70, 60, 180, 0.2)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 0.75,
                  fontWeight: 600,
                  fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                }}
              >
                Login
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  mb: 2.75,
                  color: "text.secondary",
                }}
              >
                Sign in to continue to Plirafy
              </Typography>

              <TextField
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 1.75 }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 0.75 }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2.25 }}>
                <Link
                  component="button"
                  underline="hover"
                  sx={{ color: "secondary.main" }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: "0.95rem",
                  borderRadius: "1rem",
                  fontWeight: 700,
                }}
                onClick={handleLogin}
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              {error instanceof Error && (
                <Typography
                  sx={{ mt: 1.5, color: "error.main", textAlign: "center" }}
                >
                  {error.message}
                </Typography>
              )}

              <Box
                sx={{
                  mt: 2.25,
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Typography color="text.secondary">
                  Don&apos;t have an account?
                </Typography>
                <Link component="button" underline="hover">
                  Register Account
                </Link>
              </Box>
            </Paper>
          </Box>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Created by: KuMiStack
          </Typography>

          {message && (
            <Typography
              variant="caption"
              sx={{
                color:
                  message === "Failed to connect to backend"
                    ? "error.main"
                    : "success.main",
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}

export default LoginPage;