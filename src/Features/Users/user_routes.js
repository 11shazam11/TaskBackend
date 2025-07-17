import UserController from "./User_controller.js";
import express from "express";
import authenticateJWT from "../../Middlewares/JWT_auth.js";

const userController = new UserController();
const userRoutes = express.Router();

//get all users
userRoutes.get("/", authenticateJWT, (req, res,next) => {
  userController.getAllUsers(req, res,next);
});

//user register
userRoutes.post("/register", (req, res,next) => {
  userController.registerUser(req, res,next);
});
//user login
userRoutes.post("/login", (req, res,next) => {
  userController.loginUser(req, res,next);
});

//protected route example
userRoutes.get("/protected", authenticateJWT, (req, res) => {
  res.status(200).send({ success: true, message: "Protected route accessed", user: req.user });
});
export default userRoutes;