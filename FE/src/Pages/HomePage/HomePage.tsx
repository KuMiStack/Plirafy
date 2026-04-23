import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import AppLayout from "../../Components/Layout/AppLayout";
import type { Activity } from "./api/apiHomePage";
import { useGetActivities } from "./hooks/useGetActivities";

function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });

  const {
    data: activities = [],
    isLoading,
    isError,
    refetch,
  } = useGetActivities(isDialogOpen);
  const openDialog = () => {
    setIsDialogOpen(true);
    setSelectedActivity(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedActivity(null);
  };

  const handleConfirm = () => {
    if (!selectedActivity) {
      setNotification({
        open: true,
        severity: "error",
        message: "Please select an activity first",
      });
      return;
    }

    setNotification({
      open: true,
      severity: "success",
      message: `${selectedActivity.activityName} selected`,
    });
    closeDialog();
  };

  return (
    <AppLayout showAppBar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 3, sm: 4 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={openDialog}
          sx={{
            px: { xs: 2.5, sm: 3.25 },
            py: 1.25,
            borderRadius: "1.2rem",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            boxShadow: "0 16px 34px var(--plirafy-accent-shadow)",
          }}
        >
          <Box component="span" sx={{ fontSize: "1.35rem", mr: 1, lineHeight: 1 }}>
            +
          </Box>
          Create a new activity
        </Button>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: "1.45rem",
              background: "var(--plirafy-drawer-bg)",
              backgroundImage:
                "radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--plirafy-accent-start) 24%, transparent), transparent 42%), radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--plirafy-accent-end) 18%, transparent), transparent 46%)",
              border: "1px solid var(--plirafy-divider)",
              boxShadow: "0 24px 70px rgba(0, 0, 0, 0.42)",
              backdropFilter: "blur(18px)",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 800 }}>
          Create a new activity
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 3, overflow: "hidden" }}>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            Choose one of the available activities, then confirm to add it.
          </Typography>

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          )}

          {isError && !isLoading && (
            <Box
              sx={{
                p: 2,
                borderRadius: "1rem",
                border: "1px solid var(--plirafy-divider)",
                background: "var(--plirafy-paper-glass)",
              }}
            >
              <Typography sx={{ mb: 1.5 }}>
                Could not load activities.
              </Typography>
              <Button variant="contained" onClick={() => refetch()}>
                Try again
              </Button>
            </Box>
          )}

          {!isLoading && !isError && activities.length === 0 && (
            <Box
              sx={{
                p: 2,
                borderRadius: "1rem",
                border: "1px solid var(--plirafy-divider)",
                background: "var(--plirafy-paper-glass)",
              }}
            >
              <Typography>No activities are available yet.</Typography>
            </Box>
          )}

          {!isLoading && !isError && activities.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
                alignItems: "stretch",
              }}
            >
              {activities.map((activity, index) => {
                const activityKey = activity.id ?? `${activity.activityName}-${index}`;
                const isSelected = selectedActivity === activity;

                return (
                  <Box
                    key={activityKey}
                    component="button"
                    type="button"
                    onClick={() => setSelectedActivity(activity)}
                    sx={{
                      p: 1.5,
                      minHeight: { xs: "7rem", sm: "8rem" },
                      height: "100%",
                      textAlign: "left",
                      borderRadius: "1rem",
                      border: isSelected
                        ? "2px solid var(--plirafy-accent-end)"
                        : "1px solid var(--plirafy-divider)",
                      background: isSelected
                        ? "linear-gradient(135deg, color-mix(in srgb, var(--plirafy-accent-start) 18%, transparent), color-mix(in srgb, var(--plirafy-accent-end) 12%, transparent))"
                        : "var(--plirafy-paper-glass)",
                      color: "text.primary",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                      boxShadow: isSelected
                        ? "0 14px 28px var(--plirafy-accent-shadow)"
                        : "none",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.18)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "1.65rem", mb: 0.75 }}>
                      {activity.icon}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
                      {activity.activityName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        display: "-webkit-box",
                        fontSize: "0.88rem",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                    >
                      {activity.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 3,
            }}
          >
            <Button variant="text" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!selectedActivity}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

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
    </AppLayout>
  );
}

export default HomePage;
