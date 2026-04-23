import { useState, type ChangeEvent } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KuMiStackMarkNOBG from "../../assets/KuMiStackMarkNOBG.png";
import PlirafyMarkNOBG from "../../assets/PlirafyMarkNOBG.png";
import { useUserStore } from "../../Pages/LoginPage/store/useUserStore";
import { usePlirafyTheme } from "./PlirafyThemeProvider";
import {
  accentOptions,
  backgroundOptions,
  getPlirafyThemeParts,
  isHexColor,
  type AccentColorValue,
} from "./theme";
import { useOnlineStatus } from "./useOnlineStatus";

const getColorPickerValue = (value: AccentColorValue) => {
  if (isHexColor(value)) {
    return value;
  }

  return accentOptions.find((option) => option.id === value)?.main ?? "#7c5cff";
};

const iconSx = {
  color: "inherit",
  fontSize: "1.2rem",
};

const ThemeSettingsIcon = () => (
  <SvgIcon sx={iconSx} viewBox="0 0 24 24">
    <path d="M12 3a9 9 0 0 0 0 18h1.4c1.2 0 1.8-1.44.96-2.28a1.64 1.64 0 0 1 1.16-2.8h1.58A4.9 4.9 0 0 0 22 11.02C22 6.6 17.52 3 12 3Zm-4.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm2.5 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
  </SvgIcon>
);

const BugReportIcon = () => (
  <SvgIcon sx={iconSx} viewBox="0 0 24 24">
    <path d="M20 8h-2.8a6.44 6.44 0 0 0-1.1-1.5l1.67-1.67-1.42-1.42-1.86 1.86A6.13 6.13 0 0 0 12 4.75c-.88 0-1.72.18-2.49.52L7.65 3.41 6.23 4.83 7.9 6.5A6.44 6.44 0 0 0 6.8 8H4v2h2.1c-.07.33-.1.66-.1 1v1H4v2h2v1c0 .34.03.67.1 1H4v2h2.8A6 6 0 0 0 12 21a6 6 0 0 0 5.2-3H20v-2h-2.1c.07-.33.1-.66.1-1v-1h2v-2h-2v-1c0-.34-.03-.67-.1-1H20V8Zm-5 7a3 3 0 0 1-6 0v-4a3 3 0 0 1 6 0v4Zm-4-5h2v2h-2v-2Zm0 4h2v2h-2v-2Z" />
  </SvgIcon>
);

const ContactIcon = () => (
  <SvgIcon sx={iconSx} viewBox="0 0 24 24">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 4.8-8-4.8V6l8 4.8L20 6v2.2Z" />
  </SvgIcon>
);

const LogoutIcon = () => (
  <SvgIcon sx={iconSx} viewBox="0 0 24 24">
    <path d="M10 17v-2h4v-2h-4v-2h4V9h-4V7l-5 5 5 5Zm8 3H12v-2h6V6h-6V4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z" />
  </SvgIcon>
);

const OnlineStatusIcon = () => (
  <SvgIcon sx={{ color: "inherit", fontSize: "1rem" }} viewBox="0 0 24 24">
    <path d="M12 18.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Zm-4.95-4.95 1.42 1.42a5 5 0 0 1 7.06 0l1.42-1.42a7 7 0 0 0-9.9 0ZM3.5 10l1.42 1.42a10 10 0 0 1 14.16 0L20.5 10a12 12 0 0 0-17 0Z" />
  </SvgIcon>
);

const OfflineStatusIcon = () => (
  <SvgIcon sx={{ color: "inherit", fontSize: "1rem" }} viewBox="0 0 24 24">
    <path d="m3.28 2 18.72 18.72-1.28 1.28-3.08-3.08A1.75 1.75 0 0 1 15.5 17.2L12 13.7l-1.5-1.5-2.08-2.08L6.95 8.65 2 3.28 3.28 2ZM12 5a12 12 0 0 1 8.5 3.52L19.08 9.94A10 10 0 0 0 8.2 7.3L6.65 5.75A11.96 11.96 0 0 1 12 5Zm0 4a8 8 0 0 1 5.66 2.34l-1.42 1.42A6 6 0 0 0 10.8 11.1L9.2 9.5A8.08 8.08 0 0 1 12 9Zm-7.08-.48 1.42 1.42a10.2 10.2 0 0 0-1.42 1.48L3.5 10a12.64 12.64 0 0 1 1.42-1.48Zm3.2 3.2 1.42 1.42a5.6 5.6 0 0 0-1.07 1.09l-1.42-1.42c.31-.39.67-.75 1.07-1.09Z" />
  </SvgIcon>
);

const menuIconSlotSx = {
  alignItems: "center",
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--plirafy-accent-start) 24%, transparent), color-mix(in srgb, var(--plirafy-accent-end) 16%, transparent))",
  border: "1px solid color-mix(in srgb, var(--plirafy-accent-end) 26%, transparent)",
  borderRadius: "0.95rem",
  color: "text.primary",
  display: "grid",
  height: 38,
  justifyContent: "center",
  minWidth: 0,
  mr: 1.35,
  transition: "transform 0.22s ease, box-shadow 0.22s ease",
  width: 38,
  "& .MuiSvgIcon-root": {
    filter: "drop-shadow(0 0 8px var(--plirafy-accent-shadow))",
  },
};

const drawerMenuItemHoverSx = {
  background:
    "linear-gradient(90deg, color-mix(in srgb, var(--plirafy-accent-start) 18%, transparent), color-mix(in srgb, var(--plirafy-accent-end) 10%, transparent))",
  borderColor:
    "color-mix(in srgb, var(--plirafy-accent-end) 28%, transparent)",
  boxShadow: "0 14px 26px rgba(0, 0, 0, 0.16)",
  transform: "translateX(-4px)",
  "& .MuiListItemIcon-root": {
    boxShadow: "0 0 18px var(--plirafy-accent-shadow)",
    transform: "scale(1.05)",
  },
};

const drawerMenuItemSx = {
  border: "1px solid transparent",
  borderRadius: "1rem",
  mx: 1.5,
  my: 0.45,
  opacity: 0,
  py: 1.05,
  transform: "translateX(16px)",
  transition:
    "background 0.22s ease, border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
  animation: "drawerItemIn 420ms ease forwards",
  "& .MuiListItemText-primary": {
    color: "text.primary",
    fontWeight: 700,
  },
  "&:hover": drawerMenuItemHoverSx,
};

function MainAppBar() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const isOnline = useOnlineStatus();
  const { settings, setBackground, setAccentStart, setAccentEnd } =
    usePlirafyTheme();
  const { gradient } = getPlirafyThemeParts(settings);

  const closeDrawer = () => setIsDrawerOpen(false);
  const closeThemeDialog = () => setIsThemeDialogOpen(false);
  const closeContactDialog = () => setIsContactDialogOpen(false);

  const openThemeDialog = () => {
    setIsThemeDialogOpen(true);
    closeDrawer();
  };

  const openContactDialog = () => {
    setIsContactDialogOpen(true);
    closeDrawer();
  };

  const handleLogout = () => {
    clearUser();
    closeDrawer();
    navigate("/");
  };

  const handleCustomAccentStart = (event: ChangeEvent<HTMLInputElement>) => {
    setAccentStart(event.target.value as `#${string}`);
  };

  const handleCustomAccentEnd = (event: ChangeEvent<HTMLInputElement>) => {
    setAccentEnd(event.target.value as `#${string}`);
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
                  backgroundColor:
                    "color-mix(in srgb, var(--plirafy-accent-end) 12%, transparent)",
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
                border:
                  "1px solid color-mix(in srgb, var(--plirafy-accent-start) 45%, transparent)",
                boxShadow: "0 0 18px var(--plirafy-accent-shadow)",
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  background: "var(--plirafy-gradient)",
                  color: "text.primary",
                  border:
                    "1px solid color-mix(in srgb, var(--plirafy-accent-end) 40%, transparent)",
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
        transitionDuration={{ enter: 360, exit: 260 }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(3px)",
            },
          },
          paper: {
            sx: {
              width: { xs: "min(86vw, 20rem)", sm: "21.5rem" },
              height: { xs: "100%", sm: "calc(100% - 3rem)" },
              m: { xs: 0, sm: 1.5 },
              borderRadius: {
                xs: "1.35rem 0 0 1.35rem",
                sm: "1.7rem",
              },
              background: "var(--plirafy-drawer-bg)",
              backgroundImage:
                "radial-gradient(circle at 22% 8%, color-mix(in srgb, var(--plirafy-accent-start) 28%, transparent), transparent 34%), radial-gradient(circle at 96% 88%, color-mix(in srgb, var(--plirafy-accent-end) 22%, transparent), transparent 38%)",
              border: "1px solid var(--plirafy-divider)",
              boxShadow:
                "-24px 22px 70px rgba(0, 0, 0, 0.36), inset 1px 0 0 rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(22px)",
              overflow: "hidden !important",
            },
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            py: { xs: 1, sm: 1.5 },
            overflow: "hidden",
            "@keyframes drawerItemIn": {
              from: {
                opacity: 0,
                transform: "translateX(16px)",
              },
              to: {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
            "@keyframes drawerOrbFloat": {
              "0%, 100%": {
                transform: "translate3d(0, 0, 0) scale(1)",
              },
              "50%": {
                transform: "translate3d(-10px, 14px, 0) scale(1.08)",
              },
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-5rem",
              right: "-5rem",
              width: "12rem",
              height: "12rem",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--plirafy-accent-start) 34%, transparent), transparent 68%)",
              filter: "blur(2px)",
              opacity: 0.85,
              animation: "drawerOrbFloat 7s ease-in-out infinite",
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "4rem",
              left: "-6rem",
              width: "11rem",
              height: "11rem",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--plirafy-accent-end) 28%, transparent), transparent 70%)",
              filter: "blur(3px)",
              opacity: 0.75,
              animation: "drawerOrbFloat 8s ease-in-out infinite reverse",
              pointerEvents: "none",
            },
            "& > *": {
              position: "relative",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              m: { xs: 1, sm: 1.5 },
              mb: { xs: 0.75, sm: 1.25 },
              p: { xs: 1.65, sm: 2.25 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1,
              border: "1px solid var(--plirafy-divider)",
              borderRadius: "1.45rem",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))",
              boxShadow: "0 18px 36px rgba(0, 0, 0, 0.18)",
              animation: "drawerItemIn 360ms ease forwards",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.2,
                py: 0.55,
                borderRadius: "999px",
                color: isOnline ? "#16a34a" : "#ef4444",
                background: isOnline
                  ? "rgba(22, 163, 74, 0.12)"
                  : "rgba(239, 68, 68, 0.12)",
                border: isOnline
                  ? "1px solid rgba(22, 163, 74, 0.24)"
                  : "1px solid rgba(239, 68, 68, 0.24)",
                fontSize: "0.75rem",
                fontWeight: 800,
                mb: 0.25,
              }}
            >
              {isOnline ? <OnlineStatusIcon /> : <OfflineStatusIcon />}
              {isOnline ? "Online" : "Offline"}
            </Box>
            <Avatar
              sx={{
                width: { xs: 62, sm: 76 },
                height: { xs: 62, sm: 76 },
                background: "var(--plirafy-gradient)",
                border:
                  "1px solid color-mix(in srgb, var(--plirafy-accent-end) 42%, transparent)",
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

          <List sx={{ py: { xs: 0.45, sm: 1 }, px: 0.25 }}>
            <ListItemButton
              onClick={openThemeDialog}
              sx={{
                ...drawerMenuItemSx,
                animationDelay: "80ms",
                py: { xs: 0.72, sm: 1.05 },
              }}
            >
              <ListItemIcon sx={menuIconSlotSx}>
                <ThemeSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Theme settings" />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...drawerMenuItemSx,
                animationDelay: "140ms",
                py: { xs: 0.72, sm: 1.05 },
              }}
            >
              <ListItemIcon sx={menuIconSlotSx}>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="Report a bug" />
            </ListItemButton>
            <ListItemButton
              onClick={openContactDialog}
              sx={{
                ...drawerMenuItemSx,
                animationDelay: "200ms",
                py: { xs: 0.72, sm: 1.05 },
              }}
            >
              <ListItemIcon sx={menuIconSlotSx}>
                <ContactIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </List>

          <Divider sx={{ borderColor: "var(--plirafy-divider)" }} />

          <List sx={{ mt: "auto", py: { xs: 0.45, sm: 1 }, px: 0.25 }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                ...drawerMenuItemSx,
                animationDelay: "260ms",
                py: { xs: 0.72, sm: 1.05 },
                "&:hover": {
                  ...drawerMenuItemHoverSx,
                  background:
                    "linear-gradient(90deg, rgba(244, 67, 54, 0.14), rgba(244, 67, 54, 0.05))",
                  borderColor: "rgba(244, 67, 54, 0.28)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  ...menuIconSlotSx,
                  color: "error.main",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
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

      <Dialog
        open={isThemeDialogOpen}
        onClose={closeThemeDialog}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: "1.4rem",
              background: "var(--plirafy-drawer-bg)",
              backgroundImage: "none",
              border: "1px solid var(--plirafy-divider)",
              boxShadow: "0 24px 70px rgba(0, 0, 0, 0.42)",
              backdropFilter: "blur(18px)",
            },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 800 }}>
          Theme settings
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 3 }}>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            Customize the Plirafy background mood and choose any two colors for
            the app gradient.
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
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    border: isSelected
                      ? "2px solid var(--plirafy-accent-end)"
                      : "1px solid var(--plirafy-divider)",
                    background: option.swatch,
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-end) 32%, transparent), 0 10px 22px rgba(0, 0, 0, 0.18)"
                      : "0 0 0 2px #ffffff, 0 7px 16px rgba(0, 0, 0, 0.16)",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: isSelected
                        ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-end) 38%, transparent), 0 12px 24px rgba(0, 0, 0, 0.2)"
                        : "0 0 0 2px #ffffff, 0 0 0 4px rgba(17, 24, 39, 0.12), 0 10px 20px rgba(0, 0, 0, 0.18)",
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
              mt: 3,
              mb: 0.85,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Gradient preview
          </Typography>

          <Box
            sx={{
              height: 54,
              borderRadius: "1rem",
              background: gradient,
              border: "1px solid var(--plirafy-divider)",
              boxShadow: "0 0 22px var(--plirafy-accent-shadow)",
              mb: 2.5,
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Box>
              <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 1 }}>
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
                        width: 32,
                        height: 32,
                        borderRadius: "999px",
                        border: isSelected
                          ? "2px solid var(--plirafy-accent-end)"
                          : "1px solid var(--plirafy-divider)",
                        background: option.main,
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-start) 24%, transparent), 0 8px 18px rgba(0, 0, 0, 0.16)"
                          : "0 0 0 2px #ffffff, 0 6px 14px rgba(0, 0, 0, 0.14)",
                        transition: "transform 0.18s ease, box-shadow 0.18s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: isSelected
                            ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-start) 30%, transparent), 0 10px 20px rgba(0, 0, 0, 0.18)"
                            : "0 0 0 2px #ffffff, 0 0 0 4px rgba(17, 24, 39, 0.12), 0 8px 18px rgba(0, 0, 0, 0.16)",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  borderRadius: "0.9rem",
                  border: "1px solid var(--plirafy-divider)",
                }}
              >
                <Box
                  component="input"
                  type="color"
                  value={getColorPickerValue(settings.accentStart)}
                  onChange={handleCustomAccentStart}
                  aria-label="Choose custom first gradient color"
                  sx={{
                    width: 44,
                    height: 34,
                    p: 0,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                />
                <Typography sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                  {getColorPickerValue(settings.accentStart).toUpperCase()}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 1 }}>
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
                        width: 32,
                        height: 32,
                        borderRadius: "999px",
                        border: isSelected
                          ? "2px solid var(--plirafy-accent-start)"
                          : "1px solid var(--plirafy-divider)",
                        background: option.main,
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-end) 24%, transparent), 0 8px 18px rgba(0, 0, 0, 0.16)"
                          : "0 0 0 2px #ffffff, 0 6px 14px rgba(0, 0, 0, 0.14)",
                        transition: "transform 0.18s ease, box-shadow 0.18s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: isSelected
                            ? "0 0 0 2px #ffffff, 0 0 0 5px color-mix(in srgb, var(--plirafy-accent-end) 30%, transparent), 0 10px 20px rgba(0, 0, 0, 0.18)"
                            : "0 0 0 2px #ffffff, 0 0 0 4px rgba(17, 24, 39, 0.12), 0 8px 18px rgba(0, 0, 0, 0.16)",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  borderRadius: "0.9rem",
                  border: "1px solid var(--plirafy-divider)",
                }}
              >
                <Box
                  component="input"
                  type="color"
                  value={getColorPickerValue(settings.accentEnd)}
                  onChange={handleCustomAccentEnd}
                  aria-label="Choose custom second gradient color"
                  sx={{
                    width: 44,
                    height: 34,
                    p: 0,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                />
                <Typography sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                  {getColorPickerValue(settings.accentEnd).toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={closeThemeDialog}
            sx={{ mt: 3, borderRadius: "1rem" }}
          >
            Save theme
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isContactDialogOpen}
        onClose={closeContactDialog}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              borderRadius: "1.4rem",
              background: "var(--plirafy-drawer-bg)",
              backgroundImage:
                "radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--plirafy-accent-start) 24%, transparent), transparent 42%), radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--plirafy-accent-end) 18%, transparent), transparent 46%)",
              border: "1px solid var(--plirafy-divider)",
              boxShadow: "0 24px 70px rgba(0, 0, 0, 0.42)",
              backdropFilter: "blur(18px)",
            },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 800, textAlign: "center" }}>
          KuMiStack Contact Details
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 3, textAlign: "center" }}>
          <Box
            component="img"
            src={KuMiStackMarkNOBG}
            alt="KuMiStack logo"
            sx={{
              display: "block",
              width: "clamp(5rem, 26vw, 8rem)",
              maxHeight: "4.5rem",
              objectFit: "contain",
              mx: "auto",
              mb: 2.25,
              filter: "drop-shadow(0 10px 24px rgba(0, 0, 0, 0.24))",
            }}
          />
          <Typography sx={{ color: "text.secondary", mb: 1 }}>
            Email:
          </Typography>
          <Typography
            component="a"
            href="mailto:kumistack@gmail.com"
            sx={{
              color: "secondary.main",
              fontSize: "1.05rem",
              fontWeight: 800,
              textDecoration: "none",
              wordBreak: "break-word",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            kumistack@gmail.com
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MainAppBar;
