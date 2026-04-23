import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import { PlirafyThemeProvider } from "./Components/Layout/PlirafyThemeProvider";

function App() {
  return (
    <PlirafyThemeProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </PlirafyThemeProvider>
  );
}

export default App;
