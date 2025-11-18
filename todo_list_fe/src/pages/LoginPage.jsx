import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import { login } from "../api/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login(username, password);
            if (res?.token && res?.user_id) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user_id", res.user_id);
                localStorage.setItem("username", username);
                window.location.href = "/todos";
            } else {
                setMessage(res?.error || "Sai tài khoản hoặc mật khẩu");
            }
        } catch (err) {
            setMessage("Có lỗi xảy ra");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 400,
                    textAlign: "center",
                    backgroundColor: "#fff",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                    Welcome Back
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
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.2,
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}
