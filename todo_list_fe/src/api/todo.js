const API_URL = "http://localhost:5000"; // chỉnh đúng port backend nếu khác

function getToken() {
    return localStorage.getItem("token");
}

// 🟢 Lấy danh sách todo
export async function getTodos() {
    const res = await fetch(`${API_URL}/api/todos`, {
        headers: { Authorization: getToken() },
    });
    return res.json();
}

// 🟢 Thêm mới todo
export async function addTodo(title, description = "", completed = false) {
    const user_id = localStorage.getItem("user_id"); // lấy từ login

    const res = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
        },
        body: JSON.stringify({
            user_id,
            title,
            description,
            completed,
        }),
    });

    return res.json();
}

// 🟢 Đổi trạng thái hoàn thành
export async function toggleTodo(id) {
    const res = await fetch(`${API_URL}/api/todos/${id}/toggle`, {
        method: "PUT",
        headers: { Authorization: getToken() },
    });
    return res.json();
}

// 🟢 Cập nhật todo
export async function updateTodo(id, title, description, completed) {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
        },
        body: JSON.stringify({ title, description, completed }),
    });
    return res.json();
}

// 🟢 Xóa todo
export async function deleteTodo(id) {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: getToken() },
    });
    return res.json();
}
