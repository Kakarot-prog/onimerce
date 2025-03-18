// imports

import Auth from "../model/model.js";

import ErrorHandler from "../utils/errorhandler.js";
import { comparePassword, hashedPassword } from "../utils/hashpass.js";
import cloudinarySetup from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { resetPassToken } from "../utils/crypto.js";

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

  const text = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        /* Global Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #111827; /* Gray-900 */
            color: #f3f4f6; /* Gray-300 */
            line-height: 1.6;
            text-align: center;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: #1f2937; /* Gray-800 */
            border-radius: 15px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #374151; /* Gray-700 */
        }

        .header img {
            width: 150px;
            height: auto;
        }

        /* Heading */
        h1 {
            font-size: 30px;
            font-weight: 700;
            background: linear-gradient(90deg, #9333ea, #ec4899); /* Purple to Pink */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 25px;
            letter-spacing: 1px;
        }

        /* Paragraph */
        p {
            font-size: 16px;
            color: #9ca3af; /* Gray-400 */
            margin: 15px 0;
        }

        /* Button */
        .cta-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(90deg, #9333ea, #ec4899); /* Purple to Pink */
            color: #ffffff !important;
            font-size: 18px;
            font-weight: 600;
            border-radius: 50px;
            text-decoration: none;
            margin-top: 30px;
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        /* Footer */
        .footer {
            font-size: 14px;
            color: #6b7280; /* Gray-500 */
            margin-top: 40px;
        }

        .footer a {
            color: #9333ea; /* Purple-500 */
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://www.canva.com/design/DAGg2mEyzpg/T9VDJ1T8pRzfQtZdBxNwhw/edit" alt="Company Logo" width="150">
        </div>

        <!-- Content -->
        <h1>Email Verification</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for signing up! We're excited to have you on board. To complete your registration, please click the button below to verify your email address.</p>

        <a href="http://localhost:5173/verify/${token}" class="cta-button">Verify My Email</a>

        <p>If you didn't sign up for this account, you can ignore this email.</p>

        <!-- Footer -->
        <div class="footer">
            <p>Need help? <a href="https://instagram.com/">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`;

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
    return next(new ErrorHandler("user already verified"));
  }

  await Auth.create(user);

  res.json({
    message: "User verified",
    user,
    success: true,
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

// Forgot Password Email
export const forgotPass = async (req, res, next) => {
  const { email } = req.body;

  const user = await Auth.findOne({ email: email });

  if (!user) {
    return next(new ErrorHandler("Couldn't find user", 404));
  }

  const resetToken = resetPassToken();
  user.resetPassToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPassExpire = Date.now() + 30 * 60 * 60 * 1000;

  await user.save();

  const reset_url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/forgot/password/${resetToken}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        /* Global Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #111827; /* Gray-900 */
            color: #f3f4f6; /* Gray-300 */
            line-height: 1.6;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #1f2937; /* Gray-800 */
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #374151; /* Gray-700 */
        }

        .header img {
            width: 150px;
        }

        /* Content */
        .content {
            padding: 30px 20px;
        }

        .content h2 {
            font-size: 24px;
            font-weight: 700;
            color: #f3f4f6; /* Gray-300 */
            margin-bottom: 20px;
        }

        .content p {
            color: #9ca3af; /* Gray-400 */
            margin-bottom: 20px;
        }

        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(90deg, #9333ea, #ec4899); /* Purple to Pink */
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: all 0.3s ease;
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280; /* Gray-500 */
            font-size: 12px;
            border-top: 1px solid #374151; /* Gray-700 */
        }

        .footer a {
            color: #9333ea; /* Purple-500 */
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://www.canva.com/design/DAGg2mEyzpg/T9VDJ1T8pRzfQtZdBxNwhw/edit" alt="Company Logo" width="150">
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Hello ${user.name},</h2>
            <p>We received a request to reset your password. Click the button below to reset it:</p>

            <a href="${reset_url}" class="button">Reset Password</a>

            <p>This link will expire in 30 minutes. If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>

            <p>Best regards,<br>
            The OniChan Team</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© ${new Date().getFullYear()} OniChan. All rights reserved.</p>
            <p>This email is sent to ${email}.</p>
        </div>
    </div>
</body>
</html>`;

  try {
    await sendEmail({
      email,
      subject: "Gravito Password Reset ",
      html,
    });
    res
      .status(200)
      .json({ success: true, message: "Reset password email sent" });
  } catch (error) {
    user.resetPassExpire = undefined;
    user.resetPassToken = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 403));
  }
};

export const resetForgotPass = async (req, res, next) => {
  const token = req.params.token;
  const resetPassToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await Auth.findOne({
    resetPassToken,
    resetPassExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Invalid or expired reset password token", 401)
    );
  }

  const { password } = req.body;

  if (!password) {
    return next(new ErrorHandler("Please provide new password", 400));
  }

  const encryptedPass = await encryptPass(password);

  user.password = encryptedPass;
  user.resetPassToken = undefined;
  user.resetPassExpires = undefined;
  await user.save();
  res.json({ success: true, message: "Password reset successfully" });
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

// LoggedIn User Details
export const myProfile = async (req, res, next) => {
  const useId = req.user.id;

  const user = await Auth.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("Login first to access this page", 500));
  }

  res.status(200).send({
    success: true,
    message: "Your profile has been fetched successfully",
    result: user,
  });
};

// Update User Details
export const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const updates = { ...req.body };
  const image = req.file;

  // Check if user exists
  const user = await Auth.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Update user data
  if (image) {
    if (user.avatar) {
      await deleteImage(user.avatar);
    }

    updates.avatar = await uploadImage(image);
    console.log("testing socnhd");
    // user.updatedAt = Date.now();
    await user.save();
  }

  const updatedUser = await Auth.findByIdAndUpdate(userId, updates);
  await updatedUser.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    result: updatedUser,
  });
};

// Delete User
export const deleteMyProfile = async (req, res, next) => {
  const userId = req.user.id;

  // Check if user exists
  const user = await Auth.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Delete user
  await Auth.findByIdAndDelete(userId);

  res.status(200).json({ success: true, message: "User deleted successfully" });
};

// Delete Image
export const deleteAvatar = async (req, res, next) => {
  const userId = req.user.id;
  const user = await Auth.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Delete previous image
  if (user.avatar) {
    await deleteImage(user.avatar);
    user.avatar = undefined;
    await user.save();
  }

  res
    .status(200)
    .json({ success: true, message: "Image deleted successfully" });
};

// ====================== Admin Controllers ======================
// Get All users
export const allUsers = async (req, res, next) => {
  const users = await Auth.find();

  if (!users) {
    return next(new Error("No user registered on this site", 404));
  }

  const totalUsers = await Auth.countDocuments();

  res.status(200).serHandlend({
    success: true,
    message: "All users fetched successfully",
    totalUsers,
    currentPage: req.query.page,
    pageSize: req.query.limit,
    totalPages: Math.ceil(totalUsers / req.query.limit),
    length: users.length,
    result: users,
  });
};

// Get Single User
export const singleUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await Auth.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    result: user,
  });
};

// Delete single user

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await Auth.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await Auth.findByIdAndDelete(userId);

  res.status(200).json({ success: true, message: "User deleted successfully" });
};
