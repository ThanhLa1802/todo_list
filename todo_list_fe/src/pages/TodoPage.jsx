import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    Checkbox,
    Typography,
    IconButton,
    Box,
    Paper,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../api/todo";

export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const data = await getTodos();
        setTodos(data || []);
    };

    const handleAdd = async () => {
        if (!title.trim()) return;
        await addTodo(title, description);
        setTitle("");
        setDescription("");
        fetchTodos();
    };

    const handleToggle = async (id) => {
        await toggleTodo(id);
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        fetchTodos();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "#f4f6f8",
                py: 6,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: "800px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                }}
            >
                {/* Tiêu đề */}
                <Typography
                    variant="h4"
                    gutterBottom
                    textAlign="center"
                    fontWeight="bold"
                    sx={{ color: "#1976d2" }}
                >
                    📝 My Todo List
                </Typography>

                {/* Form thêm todo */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        size="medium"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ width: "70%" }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{
                            mt: 1,
                            px: 5,
                            py: 1.2,
                            fontWeight: "bold",
                            textTransform: "none",
                            backgroundColor: "#1976d2",
                            "&:hover": { backgroundColor: "#1565c0" },
                        }}
                    >
                        Add Todo
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Danh sách todo */}
                <List>
                    {todos.map((t) => (
                        <ListItem
                            key={t.id}
                            sx={{
                                backgroundColor: "#fafafa",
                                borderRadius: 2,
                                mb: 1.5,
                                boxShadow: 1,
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "#e3f2fd",
                                    transform: "scale(1.01)",
                                },
                            }}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    color="error"
                                    onClick={() => handleDelete(t.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <Checkbox
                                checked={t.completed}
                                onChange={() => handleToggle(t.id)}
                            />
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {t.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {t.description}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                    {todos.length === 0 && (
                        <Typography
                            textAlign="center"
                            color="text.secondary"
                            sx={{ mt: 3 }}
                        >
                            No todos yet. Add one above!
                        </Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
}
