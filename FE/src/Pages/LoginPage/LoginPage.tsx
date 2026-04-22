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
import { useLogin } from "./hooks/useLogin";
/* import KuMiStackLogo from "../../assets/KuMiStackNOBG.png"; */

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
          gap: 1.75,
          py: 1.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
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
              height: "auto",
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
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 30px rgba(70, 60, 180, 0.12)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 0.75,
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
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
                fontSize: "clamp(1rem, 1.2vw, 1.08rem)",
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
                mb: 2.25,
              }}
            >
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => {}}
                sx={{
                  color: "secondary.main",
                  fontSize: "0.98rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
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
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
              onClick={handleLogin}
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            {error instanceof Error && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,
                  color: "error.main",
                  textAlign: "center",
                }}
              >
                {error.message}
              </Typography>
            )}

            <Box
              sx={{
                mt: 2.25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Don&apos;t have an account?
              </Typography>

              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => {}}
                sx={{
                  color: "primary.main",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Register Account
              </Link>
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.35,
            opacity: 0.92,
            mt: 0.25,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.02em",
            }}
          >
            Created by: KuMiStack
          </Typography>

          {/* <Box
            component="img"
            src={KuMiStackLogo}
            alt="KuMiStack Logo"
            sx={{
              width: "clamp(2.3rem, 4.6vw, 3.3rem)",
              height: "auto",
              display: "block",
            }}
          /> */}
        </Box>

        {message && (
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              color:
                message === "Failed to connect to backend"
                  ? "error.main"
                  : "success.main",
              textAlign: "center",
              fontSize: "0.85rem",
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