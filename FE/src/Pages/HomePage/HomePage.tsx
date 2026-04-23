import { useState, type MouseEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  SvgIcon,
  Typography,
} from "@mui/material";
import AppLayout from "../../Components/Layout/AppLayout";
import { useUserStore } from "../LoginPage/store/useUserStore";
import {
  getActivityId,
  getUserActivityId,
  type Activity,
} from "./api/apiHomePage";
import { useAssignActivityToUser } from "./hooks/useAssignActivityToUser";
import { useDeleteUserActivity } from "./hooks/useDeleteUserActivity";
import { useGetActivities } from "./hooks/useGetActivities";
import { useGetUserActivities } from "./hooks/useGetUserActivities";

const MenuDotsIcon = () => (
  <SvgIcon sx={{ fontSize: "1.25rem" }} viewBox="0 0 24 24">
    <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  </SvgIcon>
);

const EditIcon = () => (
  <SvgIcon sx={{ fontSize: "1.1rem" }} viewBox="0 0 24 24">
    <path d="M4 17.25V20h2.75L17.81 8.94l-2.75-2.75L4 17.25ZM19.71 7.04a1 1 0 0 0 0-1.42l-1.33-1.33a1 1 0 0 0-1.42 0l-1.04 1.04 2.75 2.75 1.04-1.04Z" />
  </SvgIcon>
);

const DeleteIcon = () => (
  <SvgIcon sx={{ fontSize: "1.1rem" }} viewBox="0 0 24 24">
    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM8 4l1-1h6l1 1h4v2H4V4h4Z" />
  </SvgIcon>
);

function HomePage() {
  const user = useUserStore((state) => state.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activityMenuAnchor, setActivityMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [menuActivity, setMenuActivity] = useState<Activity | null>(null);
  const [dialogError, setDialogError] = useState("");
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
  const {
    data: userActivities = [],
    isLoading: isUserActivitiesLoading,
    isError: isUserActivitiesError,
    refetch: refetchUserActivities,
  } = useGetUserActivities(user?.id);
  const {
    mutateAsync: assignActivityToUser,
    isPending: isAssigningActivity,
  } = useAssignActivityToUser();
  const {
    mutateAsync: deleteUserActivity,
    isPending: isDeletingActivity,
  } = useDeleteUserActivity();

  const closeActivityMenu = () => {
    setActivityMenuAnchor(null);
    setMenuActivity(null);
  };

  const openActivityMenu = (
    event: MouseEvent<HTMLElement>,
    activity: Activity
  ) => {
    event.stopPropagation();
    setActivityMenuAnchor(event.currentTarget);
    setMenuActivity(activity);
  };

  const handleEditActivity = () => {
    setNotification({
      open: true,
      severity: "success",
      message: "Edit activity is coming soon",
    });
    closeActivityMenu();
  };

  const handleDeleteActivity = async () => {
    if (!menuActivity) {
      return;
    }

    const userActivityId = getUserActivityId(menuActivity);

    if (userActivityId === undefined) {
      setNotification({
        open: true,
        severity: "error",
        message: "User activity id is missing",
      });
      closeActivityMenu();
      return;
    }

    try {
      await deleteUserActivity(userActivityId);
      await refetchUserActivities();
      setNotification({
        open: true,
        severity: "success",
        message: `${menuActivity.activityName} deleted`,
      });
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        message: err instanceof Error ? err.message : "Deleting activity failed",
      });
    } finally {
      closeActivityMenu();
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setSelectedActivity(null);
    setDialogError("");
  };

  const closeDialog = () => {
    if (isAssigningActivity) {
      return;
    }

    setIsDialogOpen(false);
    setSelectedActivity(null);
    setDialogError("");
  };

  const closeDialogAfterAssign = () => {
    setIsDialogOpen(false);
    setSelectedActivity(null);
    setDialogError("");
  };

  const handleConfirm = async () => {
    if (!selectedActivity) {
      setDialogError("Please select an activity first.");
      setNotification({
        open: true,
        severity: "error",
        message: "Please select an activity first",
      });
      return;
    }

    if (!user?.id) {
      setDialogError(
        "User is not available. Please log in again before assigning an activity."
      );
      setNotification({
        open: true,
        severity: "error",
        message: "User is not available",
      });
      return;
    }

    const activityId = getActivityId(selectedActivity);

    if (activityId === undefined) {
      setDialogError("Activity id is missing from the selected activity.");
      setNotification({
        open: true,
        severity: "error",
        message: "Activity id is missing",
      });
      return;
    }

    setDialogError("");

    try {
      await assignActivityToUser({
        userId: user.id,
        activityId,
      });

      await refetchUserActivities();

      setNotification({
        open: true,
        severity: "success",
        message: `${selectedActivity.activityName} added`,
      });
      closeDialogAfterAssign();
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        message: err instanceof Error ? err.message : "Assigning activity failed",
      });
    }
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
              {userActivities.length} active
            </Typography>
          </Box>

          {isUserActivitiesLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          )}

          {isUserActivitiesError && !isUserActivitiesLoading && (
            <Box
              sx={{
                p: 2.5,
                borderRadius: "1.2rem",
                border: "1px solid var(--plirafy-divider)",
                background: "var(--plirafy-paper-glass)",
              }}
            >
              <Typography>Could not load your active activities.</Typography>
            </Box>
          )}

          {!isUserActivitiesLoading &&
            !isUserActivitiesError &&
            userActivities.length === 0 && (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "1.2rem",
                  border: "1px solid var(--plirafy-divider)",
                  background: "var(--plirafy-paper-glass)",
                }}
              >
                <Typography sx={{ fontWeight: 800 }}>
                  No active activities yet.
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                  Create one below to start filling this rail.
                </Typography>
              </Box>
            )}

          {!isUserActivitiesLoading &&
            !isUserActivitiesError &&
            userActivities.length > 0 && (
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
                {userActivities.map((activity, index) => (
                  <Box
                    key={
                      getUserActivityId(activity) ??
                      getActivityId(activity) ??
                      `${activity.activityName}-${index}`
                    }
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
                        {activity.icon ?? "A"}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
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
                        <IconButton
                          aria-label={`Open ${activity.activityName} menu`}
                          onClick={(event) => openActivityMenu(event, activity)}
                          sx={{
                            color: "text.primary",
                            width: 34,
                            height: 34,
                            background:
                              "color-mix(in srgb, var(--plirafy-accent-end) 14%, transparent)",
                            border: "1px solid var(--plirafy-divider)",
                            "&:hover": {
                              background:
                                "color-mix(in srgb, var(--plirafy-accent-end) 24%, transparent)",
                            },
                          }}
                        >
                          <MenuDotsIcon />
                        </IconButton>
                      </Box>
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
            )}
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

      <Menu
        anchorEl={activityMenuAnchor}
        open={Boolean(activityMenuAnchor)}
        onClose={closeActivityMenu}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: "10rem",
              borderRadius: "1rem",
              background: "var(--plirafy-drawer-bg)",
              backgroundImage: "none",
              border: "1px solid var(--plirafy-divider)",
              boxShadow: "0 18px 42px rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(14px)",
            },
          },
        }}
      >
        <MenuItem onClick={handleEditActivity}>
          <ListItemIcon sx={{ color: "text.primary", minWidth: 34 }}>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleDeleteActivity}
          disabled={isDeletingActivity}
          sx={{ color: "error.main", fontWeight: 700 }}
        >
          <ListItemIcon sx={{ color: "error.main", minWidth: 34 }}>
            <DeleteIcon />
          </ListItemIcon>
          {isDeletingActivity ? "Deleting..." : "Delete"}
        </MenuItem>
      </Menu>

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

          {dialogError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {dialogError}
            </Alert>
          )}

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
                const activityKey =
                  getActivityId(activity) ?? `${activity.activityName}-${index}`;
                const isSelected = selectedActivity === activity;

                return (
                  <Box
                    key={activityKey}
                    component="button"
                    type="button"
                    onClick={() => {
                      setSelectedActivity(activity);
                      setDialogError("");
                    }}
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
                      {activity.icon ?? "A"}
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
            <Button
              variant="text"
              onClick={closeDialog}
              disabled={isAssigningActivity}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!selectedActivity || isAssigningActivity}
            >
              {isAssigningActivity ? "Adding..." : "Confirm"}
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
