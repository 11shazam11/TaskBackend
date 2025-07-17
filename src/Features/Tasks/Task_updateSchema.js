import mongoose from "mongoose";
const taskUpdateSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    oldStatus: {
        type: String,
    },
    newStatus: {
        type: String,
    }
});
const TaskUpdate = mongoose.model("TaskUpdate", taskUpdateSchema);
export default TaskUpdate;
