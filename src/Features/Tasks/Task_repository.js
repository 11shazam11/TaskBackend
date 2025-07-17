import Task from "./Task_schema.js";
import TaskUpdate from "./Task_updateSchema.js";

class TaskRepository {
    async createTask(taskData) {
        try {
            const task = new Task(taskData);
            await task.save();
            return task;
        } catch (error) {
            throw new Error("Error creating task: " + error.message);
        }
    }

    async getAllTasks() {
        try {
            const tasks = await Task.find().populate('assignTo', 'name email'); // Populate assignedTo with user details
            return tasks;
        } catch (error) {
            throw new Error("Error fetching tasks: " + error.message);
        }
    }

    //delete task
    async deleteTask(taskId) {
        try {
            const task = await Task.findByIdAndDelete(taskId);
            if (!task) {
                throw new Error("Task not found");
            }
            return task;
        } catch (error) {
            throw new Error("Error deleting task: " + error.message);
        }
    }
    
    //update task status
    async updateTaskStatus(taskId, newStatus, userId) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error("Task not found");
            }
            const oldStatus = task.status;
            if(oldStatus === "todo"){
                task.assignedTo = userId; // Assign the task to the user if it's in "todo"
            }
            task.status = newStatus;
            await task.save();

            // Log the update
            const taskUpdate = new TaskUpdate({
                taskId: task._id,
                userId: userId,
                oldStatus: oldStatus,
                newStatus: newStatus
            });
            await taskUpdate.save();

            return task;
        } catch (error) {
            throw new Error("Error updating task status: " + error.message);
        }
    }
    
    async getlogs() {
    try {
      const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);

      const logs = await TaskUpdate.find({
        updatedAt: { $gte: twentyMinutesAgo }
      })
        .populate('taskId', 'title')   // Populate task title
        .populate('userId', 'name');   // Populate user name

      return logs;
    } catch (error) {
      throw new Error("Error fetching logs: " + error.message);
    }
  }
}
export default TaskRepository;