import express from 'express';
import cors from 'cors';
//security
import authenticateJWT from './Middlewares/JWT_auth.js';
import ApplicationError from './Middlewares/Application_Error.js';
import userRoutes from './Features/Users/user_routes.js';
import taskRoutes from './Features/Tasks/Task_routes.js';
//socket server 
import { Server } from 'socket.io';
import http from 'http';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/user/",userRoutes);
app.use("/api/task/",authenticateJWT,taskRoutes);

app.use((error, req, res, next) => {
    if(error instanceof ApplicationError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
})

//http server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});
//checking list of connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle socket events here
    socket.on('join', (data) => {
        console.log(`User ${data.userId} joined`);
        // You can store userId in a map or perform other actions
        connectedUsers.set(data.userId, socket.id);
    });
  

    socket.on('taskMoved', (data) => {
        console.log('Task moved:', data);
        // Broadcast the task move event to all connected clients
        //only emit to all user except the user who moved the task
        socket.broadcast.emit('taskMoved', data);
    });
    socket.on("taskDeleted", (taskId) => {
    // Broadcast to all others
    socket.broadcast.emit("taskDeleted", taskId);
  });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default server;