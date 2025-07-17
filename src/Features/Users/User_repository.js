import User from "./User_schema.js";

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  } 

  //get all users
  async getAllUsers() {
    return await User.find({});
  }
}

export default UserRepository;
