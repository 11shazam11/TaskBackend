import UserRepository from "./User_repository.js";
import ApplicationError from "../../Middlewares/Application_Error.js";
import generateToken from "../../Config/JWT_config.js";


class UserController {
    constructor(){
        this.userRepo = new UserRepository();
    }
  async registerUser(req, res,next) {
    try {
      const user = await this.userRepo.createUser(req.body);
      if(!user){
        throw new ApplicationError("User creation failed", 500);
      }
      return res.status(201).send({success:true, message: "User registered successfully", user});
      
    } catch (error) {
      if(error.name == 'ValidationError'){
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  //user Login
  async loginUser(req, res, next) {
    try {
     const {email,password} = req.body;
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }
      // Assuming you have a method to validate password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new ApplicationError("Invalid password", 401);
      }
      // If login is successful, you can return user data or a token
      //generate a JWT token 
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      const token = await generateToken(payload);
      console.log("userId", user._id);

      return res.status(200).send({ success: true, message: "Login successful", user, token });
    } catch (error) {
      next(error);
    }
  }


  //get all users
  async getAllUsers(req, res, next) {
    try {
      const users = await this.userRepo.getAllUsers();
      console.log('Fetched users:', users);
      return res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
