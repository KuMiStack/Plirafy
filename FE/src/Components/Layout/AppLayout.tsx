import { Box } from "@mui/material";
import type { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        overflow: "hidden",
        backgroundColor: "background.default",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default AppLayout;