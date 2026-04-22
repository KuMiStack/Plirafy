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
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlirafyMarkNOBG from "../../assets/PlirafyMarkNOBG.png";
import { useUserStore } from "../../Pages/LoginPage/store/useUserStore";

function MainAppBar() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

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
          background: "rgba(10, 10, 30, 0.58)",
          borderBottom: "1px solid rgba(124, 92, 255, 0.18)",
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
                filter: "drop-shadow(0 8px 24px rgba(124, 92, 255, 0.45))",
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
                textShadow: "0 6px 18px rgba(124, 92, 255, 0.32)",
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
                  backgroundColor: "rgba(58, 160, 255, 0.08)",
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
                border: "1px solid rgba(124, 92, 255, 0.35)",
                boxShadow: "0 0 18px rgba(124, 92, 255, 0.18)",
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  bgcolor: "rgba(124, 92, 255, 0.22)",
                  color: "text.primary",
                  border: "1px solid rgba(58, 160, 255, 0.3)",
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
              background: "rgba(18, 24, 38, 0.96)",
              backgroundImage: "none",
              borderLeft: "1px solid rgba(124, 92, 255, 0.22)",
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
                bgcolor: "rgba(124, 92, 255, 0.22)",
                border: "1px solid rgba(58, 160, 255, 0.34)",
                boxShadow: "0 0 22px rgba(124, 92, 255, 0.18)",
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

          <Divider sx={{ borderColor: "rgba(124, 92, 255, 0.18)" }} />

          <List sx={{ py: 1 }}>
            <ListItemButton>
              <ListItemText primary="Report a bug" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </List>

          <Divider sx={{ borderColor: "rgba(124, 92, 255, 0.18)" }} />

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
