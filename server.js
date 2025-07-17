import dotenv from "dotenv";
dotenv.config();
import server from "./src/index.js";
//Define the port number using an environment variable or default to 3000
const PORT = process.env.PORT_NUMBER || 3000;
//DB connection
import connectDB from "./src/Config/DB_config.js";



//Start the server

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
