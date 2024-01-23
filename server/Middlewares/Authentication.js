import ExpressError from "./ExpressError.js";
import { User } from "../Database/Models/userModel.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if (token) {
    const decodedToken = jwt.verify(token, process.env.jwtkey);
    const loggedInUser = await User.findById(decodedToken.id);
    if (!loggedInUser) {
      throw new ExpressError(403, "You are not allowed");
    }
    req.user = loggedInUser;
    next();
  } else {
    throw new ExpressError(403, "Please login First");
  }
};

const checkAdmin = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
          return next(
              res.status(403).json({
                  message: "Your are not allowed to access this..."
              }));
      }
      next();
  }
}


export { isLoggedIn, checkAdmin };
