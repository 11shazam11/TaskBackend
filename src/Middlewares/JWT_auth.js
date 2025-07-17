import jwt from "jsonwebtoken";
import ApplicationError from "./Application_Error.js";

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) {
    return next(new ApplicationError("No token provided", 403));
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    return next(new ApplicationError("Invalid token", 403));
  }
  req.user = payload;
  next();
};

export default authenticateJWT;
