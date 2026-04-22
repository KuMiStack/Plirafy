import { useState } from "react";
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
import KuMiStackMarkNOBG from "../../assets/KuMiStackMarkNOBG.png";

function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("Register account:", { username, email, password });
  };

  return (
    <AppLayout>
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
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(10,10,30,0.6), rgba(5,5,15,0.9))",
            backdropFilter: "blur(2px)",
          }}
        />

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
                Sign Up
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  mb: 2.75,
                  color: "text.secondary",
                }}
              >
                Create your Plirafy account
              </Typography>

              <TextField
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 1.75 }}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 1.75 }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2.25 }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: "0.95rem",
                  borderRadius: "1rem",
                  fontWeight: 700,
                }}
                onClick={handleSignUp}
              >
                Register
              </Button>

              <Box
                sx={{
                  mt: 2.25,
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Typography color="text.secondary">
                  Already have an account?
                </Typography>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate("/")}
                >
                  Login
                </Link>
              </Box>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.35,
              minHeight: "3.5rem",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={KuMiStackMarkNOBG}
              alt=""
              aria-hidden="true"
              sx={{
                width: "clamp(4.5rem, 9vw, 6.5rem)",
                maxHeight: "2rem",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35))",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.82)",
                fontWeight: 700,
                lineHeight: 1,
                fontSize: "0.9rem",
                letterSpacing: 0,
                textShadow: "0 4px 14px rgba(0, 0, 0, 0.42)",
              }}
            >
              KuMiStack
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}

export default SignUpPage;
