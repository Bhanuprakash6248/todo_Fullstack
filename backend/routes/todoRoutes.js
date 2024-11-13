const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for managing todos
router.post("/", authMiddleware, createTodo); // Create a new todo
router.get("/", authMiddleware, getTodos); // Get all todos
router.put("/:id", authMiddleware, updateTodo); // Update a specific todo
router.delete("/:id", authMiddleware, deleteTodo); // Delete a specific todo

module.exports = router;
