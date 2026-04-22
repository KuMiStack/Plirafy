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
import PlirafyPhrase from "../../assets/PlirafyPhrase.png";
import KuMiStackLogo from "../../assets/KuMiStackNOBG.png";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    navigate("/homepage");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        console.log(data.message);
      })
      .catch((err) => {
        console.error("Error fetching backend:", err);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <AppLayout>
      <Box
        sx={{
          width: "min(100%, 34rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 2,
        }}
      >
        {/* Floating Logo + Card Wrapper */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          {/* Floating Logo */}
          <Box
            component="img"
            src={PlirafyPhrase}
            alt="Plirafy logo"
            sx={{
              position: "absolute",
              top: "-3.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(8rem, 18vw, 12rem)",
              height: "auto",
              zIndex: 2,
              filter: "drop-shadow(0 8px 25px rgba(124, 92, 255, 0.35))",
              pointerEvents: "none",
            }}
          />

          {/* Login Card */}
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              pt: "4.5rem", // space for floating logo
              px: "clamp(1.1rem, 2.4vw, 2rem)",
              pb: "clamp(1.1rem, 2.4vw, 2rem)",
              borderRadius: "clamp(1rem, 2vw, 1.5rem)",
              border: "1px solid rgba(124, 92, 255, 0.14)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 0.5,
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
              }}
            >
              Login
            </Typography>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mb: 2.5,
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Link component="button" underline="hover">
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                py: "0.9rem",
                borderRadius: "0.9rem",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Don&apos;t have an account?
              </Typography>

              <Link component="button" underline="hover">
                Register Account
              </Link>
            </Box>
          </Paper>
        </Box>

        {/* Bottom Logo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.4,
            opacity: 0.9,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Created by
          </Typography>

          <Box
            component="img"
            src={KuMiStackLogo}
            alt="KuMiStack Logo"
            sx={{
              width: "clamp(2.5rem, 5vw, 4rem)",
              height: "auto",
            }}
          />
        </Box>

        {message && (
          <Typography
            variant="caption"
            sx={{
              color:
                message === "Failed to connect to backend"
                  ? "error.main"
                  : "success.main",
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </AppLayout>
  );
}

export default LoginPage;