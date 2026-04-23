import { useState, /* useEffect */ } from "react";
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
import { useLogin } from "./hooks/useLogin";
import { useUserStore } from "./store/useUserStore";

function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const setUser = useUserStore((state) => state.setUser);
  const { settings } = usePlirafyTheme();
  const isLightTheme = settings.background === "white";
  const phraseLogo = isLightTheme ? PlirafyPhrase : PlirafyPhraseWhite;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /* const [message, setMessage] = useState(""); */
  const [notification, setNotification] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });

  const handleLogin = () => {
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
          setUser(data.user);
          setNotification({
            open: true,
            severity: "success",
            message: "Login successful",
          });
          window.setTimeout(() => navigate("/homepage"), 900);
        },
        onError: (err) => {
          console.error("Login error:", err);
          setNotification({
            open: true,
            severity: "error",
            message: err instanceof Error ? err.message : "Login failed",
          });
        },
      }
    );
  };

/*   useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Failed to connect to backend");
      });
  }, []); */

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
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate("/signup")}
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

{/*           {message && (
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
          )} */}
        </Box>

        <Snackbar
          open={notification.open}
          autoHideDuration={3500}
          onClose={() =>
            setNotification((current) => ({ ...current, open: false }))
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            top: { xs: "4.35rem !important", sm: "4.85rem !important" },
            zIndex: 10000,
          }}
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

export default LoginPage;
