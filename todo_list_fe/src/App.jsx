import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import PrivateRoute from "./components/PrivateRoute";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <BrowserRouter>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Bên trái */}
          <Box>
            {!token && (
              <>
                <Button color="inherit" component={Link} to="/">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
            {token && (
              <>
                <Button color="inherit" component={Link} to="/todos">
                  Todos
                </Button>
              </>
            )}
          </Box>

          {/* Bên phải */}
          {token && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1">
                👋 {username || "User"}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "8px",
                  px: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
