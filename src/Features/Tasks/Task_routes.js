import express from 'express';
import TaskController from './Task_controller.js';

const taskRoutes = express.Router();
const taskController = new TaskController();

taskRoutes.post('/newtask', (req, res,next) => taskController.createTask(req, res,next));
taskRoutes.get('/alltasks', (req, res,next) => taskController.getAllTasks(req, res,next));
taskRoutes.get("/logs",(req,res,next)=>{
    taskController.getAllLogs(req,res,next);
});
taskRoutes.delete('/delete/:id', (req, res,next) => taskController.deleteTask(req, res,next));
taskRoutes.put('/update/:id', (req, res,next) => taskController.updateTaskStatus(req, res,next));

export default taskRoutes;

