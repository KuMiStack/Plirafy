import { Box } from "@mui/material";
import AppLayout from "../../Components/Layout/AppLayout";
import PlirafyLogo from "../../assets/PlirafyLogo.jpeg";

function HomePage() {
  return (
    <AppLayout showAppBar>
      <Box
        component="img"
        src={PlirafyLogo}
        alt="Plirafy Logo"
        sx={{
          width: { xs: "70%", sm: "400px", md: "500px" },
          maxWidth: "90%",
          filter: "drop-shadow(0 0 25px rgba(124, 92, 255, 0.5))",
        }}
      />
    </AppLayout>
  );
}

export default HomePage;
