import { Box } from "@mui/material";
import type { ReactNode } from "react";
import PlirafyBackground from "../../assets/PlirafyBackground.png";
import MainAppBar from "./MainAppBar";

type AppLayoutProps = {
  children: ReactNode;
  showAppBar?: boolean;
};

const AppLayout = ({ children, showAppBar = false }: AppLayoutProps) => {
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        overflow: "hidden",
        backgroundColor: "background.default",
        backgroundImage: `url(${PlirafyBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxSizing: "border-box",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "var(--plirafy-background-overlay)",
          backdropFilter: "blur(2px)",
        },
      }}
    >
      {showAppBar && <MainAppBar />}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: showAppBar ? { xs: "4.5rem", sm: "5.25rem" } : 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
