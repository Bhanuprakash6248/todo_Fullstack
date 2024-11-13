const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["done", "pending", "in progress", "completed"],
        default: "pending"
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", todoSchema);
