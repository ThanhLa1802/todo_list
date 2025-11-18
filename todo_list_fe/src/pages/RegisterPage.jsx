import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { register } from "../api/auth";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const res = await register(username, password);
            if (res?.token) {
                localStorage.setItem("token", res.token);
                window.location.href = "/todos";
            } else {
                setMessage(res?.error || "Đăng ký thất bại");
            }
        } catch (err) {
            setMessage("Có lỗi xảy ra");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Register
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
                sx={{ mt: 2 }}
                onClick={handleRegister}
            >
                Register
            </Button>
            {message && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Container>
    );
}
