const Todo = require("../models/Todo");

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const { description, status } = req.body;
        const todo = new Todo({
            userId: req.userId, // Retrieved from JWT middleware
            description,
            status
        });
        await todo.save();
        res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo", error: error.message });
    }
};

// Get all todos for the authenticated user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve todos", error: error.message });
    }
};

// Update a todo (description or status)
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, status } = req.body;

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.userId }, // Ensure the user owns the todo
            { description, status },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};
