import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../Components/Layout/AppLayout";
import { usePlirafyTheme } from "../../Components/Layout/PlirafyThemeProvider";
import PlirafyPhrase from "../../assets/PlirafyPhrase.png";
import PlirafyPhraseWhite from "../../assets/PlirafyPhraseWhite.png";
import KuMiStackMarkNOBG from "../../assets/KuMiStackMarkNOBG.png";
import { useSignUp } from "./hooks/useSignUp";

function SignUpPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUp();
  const { settings } = usePlirafyTheme();
  const isLightTheme = settings.background === "white";
  const phraseLogo = isLightTheme ? PlirafyPhrase : PlirafyPhraseWhite;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    const nextFieldErrors = {
      username: username.trim() ? "" : "Username is required",
      email: email.trim() ? "" : "Email is required",
      password: password ? "" : "Password is required",
    };

    setFieldErrors(nextFieldErrors);

    if (Object.values(nextFieldErrors).some(Boolean)) {
      return;
    }

    mutate(
      {
        username: username.trim(),
        email: email.trim(),
        password,
      },
      {
        onSuccess: (data) => {
          console.log("Sign up success:", data);
          setNotification({
            open: true,
            severity: "success",
            message: "Account created successfully",
          });
          window.setTimeout(() => navigate("/"), 900);
        },
        onError: (err) => {
          console.error("Sign up error:", err);
          setNotification({
            open: true,
            severity: "error",
            message: err instanceof Error ? err.message : "Sign up failed",
          });
        },
      }
    );
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
        }}
      >
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
              src={phraseLogo}
              alt="Plirafy phrase"
              sx={{
                position: "absolute",
                top: "-2.9rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(7.5rem, 17vw, 11rem)",
                zIndex: 2,
                filter: isLightTheme
                  ? "drop-shadow(0 10px 24px rgba(17, 24, 39, 0.2))"
                  : "drop-shadow(0 8px 25px var(--plirafy-accent-shadow))",
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
                border: "1px solid var(--plirafy-divider)",
                backdropFilter: "blur(12px)",
                background: "var(--plirafy-paper-glass)",
                boxShadow: "0 0 30px var(--plirafy-accent-shadow)",
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
                required
                error={Boolean(fieldErrors.username)}
                helperText={fieldErrors.username}
                sx={{ mb: 1.75 }}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email}
                sx={{ mb: 1.75 }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password}
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
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
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
                color: "text.primary",
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

        <Snackbar
          open={notification.open}
          autoHideDuration={3500}
          onClose={() =>
            setNotification((current) => ({ ...current, open: false }))
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={notification.severity}
            variant="filled"
            onClose={() =>
              setNotification((current) => ({ ...current, open: false }))
            }
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  );
}

export default SignUpPage;
