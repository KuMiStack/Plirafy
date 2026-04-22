import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../Components/Layout/AppLayout";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    navigate("/homepage");
  };

  return (
    <AppLayout>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </AppLayout>
  );
}

export default LoginPage;