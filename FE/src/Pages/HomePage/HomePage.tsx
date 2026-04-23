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

const placeholderActiveActivities: Activity[] = [
  {
    id: 1,
    activityName: "Morning Focus",
    description: "A quiet block for planning the day and clearing priorities.",
    icon: "MF",
  },
  {
    id: 2,
    activityName: "Workout",
    description: "Track movement, strength, or any active routine.",
    icon: "WO",
  },
  {
    id: 3,
    activityName: "Study Session",
    description: "Keep tabs on learning time and deep work progress.",
    icon: "SS",
  },
  {
    id: 4,
    activityName: "Creative Flow",
    description: "Writing, design, building, sketching, and idea work.",
    icon: "CF",
  },
];

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
          justifyContent: "flex-start",
          gap: { xs: 2.5, sm: 3 },
          px: { xs: 0, sm: 2 },
          pt: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "70rem",
            px: { xs: 2, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 2,
              mb: 1.4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.35rem", sm: "1.75rem" },
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}
              >
                Active activities
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.25 }}>
                Swipe through your current Plirafy flow.
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "text.secondary",
                display: { xs: "none", sm: "block" },
                fontSize: "0.82rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {placeholderActiveActivities.length} active
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1.6,
              overflowX: "auto",
              overflowY: "hidden",
              pb: 1.2,
              scrollPaddingInline: { xs: "1rem", sm: 0 },
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": {
                height: 8,
              },
              "&::-webkit-scrollbar-thumb": {
                background:
                  "color-mix(in srgb, var(--plirafy-accent-end) 36%, transparent)",
                borderRadius: "999px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
            }}
          >
            {placeholderActiveActivities.map((activity, index) => (
              <Box
                key={activity.id ?? `${activity.activityName}-${index}`}
                sx={{
                  flex: {
                    xs: "0 0 min(82vw, 19rem)",
                    sm: "0 0 19rem",
                    md: "0 0 21rem",
                  },
                  minHeight: { xs: "10.5rem", sm: "11.75rem" },
                  p: { xs: 2, sm: 2.25 },
                  borderRadius: "1.45rem",
                  border: "1px solid var(--plirafy-divider)",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--plirafy-accent-start) 18%, transparent), color-mix(in srgb, var(--plirafy-accent-end) 10%, transparent)), var(--plirafy-paper-glass)",
                  boxShadow: "0 18px 38px rgba(0, 0, 0, 0.18)",
                  scrollSnapAlign: "start",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  isolation: "isolate",
                  "&::before": {
                    content: '\"\"',
                    position: "absolute",
                    right: "-2.4rem",
                    top: "-2.6rem",
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "999px",
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--plirafy-accent-end) 30%, transparent), transparent 70%)",
                    zIndex: -1,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: "1.1rem",
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08))",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      fontSize: "1.05rem",
                      fontWeight: 900,
                      boxShadow: "0 12px 22px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    {activity.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Active
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.4rem" },
                      fontWeight: 900,
                      mb: 0.65,
                    }}
                  >
                    {activity.activityName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      fontSize: "0.92rem",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {activity.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

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
