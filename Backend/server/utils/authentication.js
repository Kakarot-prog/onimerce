import jwt from "jsonwebtoken";
import Auth from "../model/model.js";
import ErrorHandler from "./errorhandler.js";

// isAUthenticated Controllers
export const isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not Authenticated", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = await Auth.findOne({ email: decoded.email });
    console.log(req.user);
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
