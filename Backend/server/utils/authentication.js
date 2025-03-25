import jwt from "jsonwebtoken";
import Auth from "../model/model.js";
import ErrorHandler from "./errorhandler.js";

export const isAuthenticate = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.KEY);

    // Find the user by email from the decoded token
    req.user = await Auth.findOne({ email: decoded.email });

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    console.log(req.user); // For debugging
    next();
  } catch (error) {
    return next(new ErrorHandler("Not Authenticated", 401));
  }
};
// isAdmin Controller
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Only admin can access this page", 403));
    }
    next();
  };
};
