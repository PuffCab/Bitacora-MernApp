import axios from "axios";

const axios2 = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY4ZDg4ZWQ4MmJkNzliZjZkOWZiZiIsImVtYWlsIjoibG9jb3BsYXlhNUB0ZXN0LmNvbSIsImlhdCI6MTYzMzU2Njg5OSwiZXhwIjo5MDAwMTYzMzU2Njg5OX0.7YFM-zv2RAJhoNU7yJMCnflrlnxEKLW19u35YH0F4BM",
      
    },
  });

export default axios2
