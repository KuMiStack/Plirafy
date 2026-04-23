import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlirafyMarkNOBG from "../../assets/PlirafyMarkNOBG.png";
import { useUserStore } from "../../Pages/LoginPage/store/useUserStore";
import { usePlirafyTheme } from "./PlirafyThemeProvider";
import {
  accentOptions,
  backgroundOptions,
  getPlirafyThemeParts,
} from "./theme";

function MainAppBar() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const { settings, setBackground, setAccentStart, setAccentEnd } =
    usePlirafyTheme();
  const { gradient } = getPlirafyThemeParts(settings);

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    clearUser();
    closeDrawer();
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          background: "var(--plirafy-appbar-bg)",
          borderBottom: "1px solid var(--plirafy-divider)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "4.5rem", sm: "5.25rem" },
            px: { xs: 2, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            onClick={() => navigate("/homepage")}
            sx={{
              minWidth: 0,
              p: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box
              component="img"
              src={PlirafyMarkNOBG}
              alt=""
              aria-hidden="true"
              sx={{
                width: { xs: "2.25rem", sm: "2.65rem" },
                height: { xs: "2.75rem", sm: "3.2rem" },
                objectFit: "contain",
                filter: "drop-shadow(0 8px 24px var(--plirafy-logo-shadow))",
              }}
            />
            <Typography
              sx={{
                ml: 1,
                color: "text.primary",
                fontSize: { xs: "1.35rem", sm: "1.65rem" },
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: 0,
                textShadow: "0 6px 18px var(--plirafy-accent-shadow)",
              }}
            >
              Plirafy
            </Typography>
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate("/homepage")}
              sx={{
                color: "text.primary",
                px: { xs: 1.25, sm: 2 },
                "&:hover": {
                  color: "secondary.main",
                  backgroundColor: "color-mix(in srgb, var(--plirafy-accent-end) 12%, transparent)",
                },
              }}
            >
              Home
            </Button>

            <IconButton
              aria-label="Open user menu"
              onClick={() => setIsDrawerOpen(true)}
              sx={{
                p: 0.35,
                border: "1px solid color-mix(in srgb, var(--plirafy-accent-start) 45%, transparent)",
                boxShadow: "0 0 18px var(--plirafy-accent-shadow)",
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  background: "var(--plirafy-gradient)",
                  color: "text.primary",
                  border: "1px solid color-mix(in srgb, var(--plirafy-accent-end) 40%, transparent)",
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "min(82vw, 19rem)", sm: "20rem" },
              background: "var(--plirafy-drawer-bg)",
              backgroundImage: "none",
              borderLeft: "1px solid var(--plirafy-divider)",
              boxShadow: "-18px 0 42px rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(16px)",
            },
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            py: 2.5,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              px: 2.5,
              pb: 2.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 76,
                height: 76,
                background: "var(--plirafy-gradient)",
                border: "1px solid color-mix(in srgb, var(--plirafy-accent-end) 42%, transparent)",
                boxShadow: "0 0 22px var(--plirafy-accent-shadow)",
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
                {user?.username ?? "Plirafy User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.25 }}
              >
                {user?.email ?? "No email available"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "var(--plirafy-divider)" }} />

          <Box sx={{ px: 2.5, py: 2.25 }}>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, mb: 1.25 }}>
              Theme
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.72rem",
                fontWeight: 700,
                mb: 0.85,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Background
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {backgroundOptions.map((option) => {
                const isSelected = settings.background === option.id;

                return (
                  <Box
                    key={option.id}
                    component="button"
                    type="button"
                    aria-label={`Use ${option.label} background`}
                    aria-pressed={isSelected}
                    onClick={() => setBackground(option.id)}
                    title={option.label}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "999px",
                      border: isSelected
                        ? "2px solid var(--plirafy-accent-end)"
                        : "1px solid var(--plirafy-divider)",
                      background: option.swatch,
                      cursor: "pointer",
                      boxShadow: isSelected
                        ? "0 0 0 4px color-mix(in srgb, var(--plirafy-accent-end) 18%, transparent)"
                        : "none",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                );
              })}
            </Stack>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.72rem",
                fontWeight: 700,
                mt: 2,
                mb: 0.85,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Gradient colors
            </Typography>

            <Box
              sx={{
                height: 38,
                borderRadius: "0.9rem",
                background: gradient,
                border: "1px solid var(--plirafy-divider)",
                boxShadow: "0 0 18px var(--plirafy-accent-shadow)",
                mb: 1.25,
              }}
            />

            <Typography
              sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 0.75 }}
            >
              First color
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {accentOptions.map((option) => {
                const isSelected = settings.accentStart === option.id;

                return (
                  <Box
                    key={option.id}
                    component="button"
                    type="button"
                    aria-label={`Use ${option.label} as first gradient color`}
                    aria-pressed={isSelected}
                    onClick={() => setAccentStart(option.id)}
                    title={option.label}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "999px",
                      border: isSelected
                        ? "2px solid var(--plirafy-accent-end)"
                        : "1px solid var(--plirafy-divider)",
                      background: option.main,
                      cursor: "pointer",
                      boxShadow: isSelected
                        ? "0 0 0 3px color-mix(in srgb, var(--plirafy-accent-start) 20%, transparent)"
                        : "none",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                );
              })}
            </Stack>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.78rem",
                mt: 1.35,
                mb: 0.75,
              }}
            >
              Second color
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {accentOptions.map((option) => {
                const isSelected = settings.accentEnd === option.id;

                return (
                  <Box
                    key={option.id}
                    component="button"
                    type="button"
                    aria-label={`Use ${option.label} as second gradient color`}
                    aria-pressed={isSelected}
                    onClick={() => setAccentEnd(option.id)}
                    title={option.label}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "999px",
                      border: isSelected
                        ? "2px solid var(--plirafy-accent-start)"
                        : "1px solid var(--plirafy-divider)",
                      background: option.main,
                      cursor: "pointer",
                      boxShadow: isSelected
                        ? "0 0 0 3px color-mix(in srgb, var(--plirafy-accent-end) 20%, transparent)"
                        : "none",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "var(--plirafy-divider)" }} />

          <List sx={{ py: 1 }}>
            <ListItemButton>
              <ListItemText primary="Report a bug" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </List>

          <Divider sx={{ borderColor: "var(--plirafy-divider)" }} />

          <List sx={{ mt: "auto", py: 1 }}>
            <ListItemButton onClick={handleLogout}>
              <ListItemText
                primary={
                  <Typography sx={{ color: "error.main", fontWeight: 700 }}>
                    Log out
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MainAppBar;
