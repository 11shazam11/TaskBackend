import TaskRepository from "./Task_repository.js";
import ApplicationError from "../../Middlewares/Application_Error.js";

class TaskController {
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async createTask(req, res, next) {
        try {
            //takes title,description,status from request body
            const taskData = req.body;
            const task = await this.taskRepository.createTask(taskData);
            if(!task) {
                throw new ApplicationError("Failed to create task", 500);
            }
            return res.status(201).json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    //get all tasks
    async getAllTasks(req, res, next) {
        try {
            const tasks = await this.taskRepository.getAllTasks();
            
            return res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    //delete task by id
    async deleteTask(req, res,next) {
        try {
            const taskId = req.params.id;
            const task = await this.taskRepository.deleteTask(taskId);
            if(!task) {
                throw new ApplicationError("Task not found", 404);
            }
            return res.status(200).json({
                success: true,
                message: "Task deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    //update task status
    async updateTaskStatus(req, res,next) {
        try {
            const { taskId, newStatus } = req.body;
            
            const userId = req.user.id; 
            const task = await this.taskRepository.updateTaskStatus(taskId, newStatus, userId);
            return res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllLogs(req, res, next) {
    try {
      const logs = await this.taskRepository.getlogs();

      return res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default TaskController;