import { Box, Typography } from "@mui/material";
import AppLayout from "../../Components/Layout/AppLayout";

function FinancialTrackingPage() {
  return (
    <AppLayout showAppBar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          "@keyframes financialTitleDock": {
            "0%, 42%": {
              opacity: 1,
              paddingLeft: "1rem",
              paddingRight: "1rem",
              textAlign: "center",
              transform: "translate3d(-50%, -50%, 0) scale(1)",
            },
            "100%": {
              opacity: 1,
              paddingLeft: 0,
              paddingRight: 0,
              textAlign: "left",
              transform: "translate3d(calc(-50vw + 1.25rem), calc(-50vh + clamp(1.4rem, 4vw, 3rem)), 0) scale(0.68)",
            },
          },
          "@keyframes financialSubtitleSettle": {
            "0%, 42%": {
              opacity: 0.96,
              transform: "translate3d(0, 0, 0)",
            },
            "100%": {
              opacity: 1,
              transform: "translate3d(0, -0.15rem, 0)",
            },
          },
        }}
      >
        <Box
          sx={{
            animation:
              "financialTitleDock 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
            left: "50%",
            maxWidth: "42rem",
            px: 2,
            position: "absolute",
            textAlign: "center",
            top: "50%",
            transform: "translate3d(-50%, -50%, 0) scale(1)",
            transformOrigin: "top left",
            width: "min(100%, 42rem)",
            willChange: "transform",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(2.8rem, 8vw, 5.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 0.95,
              textShadow: "0 18px 42px var(--plirafy-accent-shadow)",
            }}
          >
            Financial Tracking
          </Typography>
          <Typography
            sx={{
              animation:
                "financialSubtitleSettle 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
              color: "text.secondary",
              fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
              fontWeight: 700,
              mt: 2,
              willChange: "transform",
            }}
          >
            Clarity for Your Cash
          </Typography>
        </Box>
      </Box>
    </AppLayout>
  );
}

export default FinancialTrackingPage;
