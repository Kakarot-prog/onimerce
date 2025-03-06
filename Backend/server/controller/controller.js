// imports

import Auth from "../model/model.js";
import ErrorHandler from "../utils/errorhandler.js";
import { comparePassword, hashedPassword } from "../utils/hashpass.js";
import cloudinarySetup from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { isAuthenticate } from "../utils/authentication.js";

//  create user
export const userRegister = async (req, res, next) => {
  const { name, email, password, role, avatar } = req.body;

  const isEmail = await Auth.findOne({ email });

  if (isEmail) {
    return next(new ErrorHandler("Invalid email", 403));
  }

  const HashedPassword = hashedPassword(password);

  const image = await cloudinarySetup(req.file.path);
  const user = await Auth({
    name,
    email,
    password: HashedPassword,
    role,
    avatar: image,
  });
  const token = jwt.sign({ user }, process.env.KEY, {
    expiresIn: "1h",
  });

  const verificationLink = `http://localhost:3000/api/v1/verify?token=${token}`;

  const text = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #E0E0E0;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: #1E1E1E;
            border-radius: 15px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }
        h1 {
            font-size: 30px;
            color: #FF9800;
            margin-bottom: 25px;
            letter-spacing: 1px;
        }
        p {
            font-size: 16px;
            margin: 15px 0;
            color: #B0B0B0;
        }
        .cta-button {
            background-color: #FF9800;
            color: white !important;
            padding: 16px 40px;
            font-size: 18px;
            border-radius: 50px;
            text-decoration: none;
            display: inline-block;
            margin-top: 30px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #FF5722;
        }
        .footer {
            font-size: 14px;
            color: #B0B0B0;
            margin-top: 40px;
        }
        .footer a {
            color: #FF9800;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for signing up! We're excited to have you on board. To complete your registration, please click the button below to verify your email address.</p>
        
        <a href="${verificationLink}" class="cta-button">Verify My Email</a>
        
        <p>If you didn’t sign up for this account, you can ignore this email.</p>
        
        <div class="footer">
            <p>Need help? <a href="https://instagram.com/">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`;

  try {
    await sendEmail({
      email,
      text,
    });

    res.status(201).json({
      success: true,
      message: "verification link sent successfully",
    });
  } catch (error) {
    console.log(error);
    console.log("Failed to send email");
    return next(new ErrorHandler("Failed to send email", 500));
  }
};

// verifying user and then add to mongoDB

export const verifyUser = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(new ErrorHandler("Invalid token"));
  }

  const decode = jwt.verify(token, process.env.KEY);

  const { user } = decode;

  const isEmail = await Auth.findOne({ email: user.email });

  if (isEmail) {
    return next(new ErrorHandler("user verified"));
  }

  await Auth.create(user);

  res.json({
    message: "User verified",
    user,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = comparePassword(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ email, password }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token).json({
    success: true,
    token,
    user,
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "User logged out successfully",
  });
};

export const resetPass = async (req, res, next) => {
  const { oldPass, newPass } = req.body;
  const userId = req.user.id;
  if (!oldPass || !newPass) {
    return next(
      new ErrorHandler("Please provide old password and new password", 400)
    );
  }
  const user = await Auth.findById(userId).select("+password");

  const isMatch = comparePassword(oldPass, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid old password", 401));
  }
  const encryptedPass = hashedPassword(newPass);

  user.password = encryptedPass;
  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};
