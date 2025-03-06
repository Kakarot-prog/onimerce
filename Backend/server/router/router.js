import { Router } from "express";
import {
  deleteProfile,
  deleteUser,
  deleteUserAvatar,
  forgotPassword,
  loginUser,
  logoutUser,
  myProfile,
  resetPass,
  resetPassword,
  UpdateProfile,
  userRegister,
  verifyUser,
} from "../controller/controller.js";
import { upload } from "../utils/multer.js";
import { isAuthenticate, isAuthorized } from "../utils/authentication.js";
import { limiter } from "../utils/rateLimiter.js";

const router = Router();

router.post("/register", upload.single("file"), userRegister);

router.get("/verify", verifyUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/resetPass", isAuthenticate, resetPass);

router.post("/forgot/password", forgotPassword);

router.post("/auth/forgot/:token", isAuthenticate, resetPassword);

router.get("/get/profile", isAuthenticate, myProfile);

router.delete("/delete/profile", isAuthenticate, deleteProfile);

router.put(
  "/user/update",
  isAuthenticate,
  upload.single("file"),
  limiter,
  UpdateProfile
);

router.delete("/delete/avatar", isAuthenticate, deleteUserAvatar);

router.delete(
  "/admin/reject/:id",
  isAuthenticate,
  isAuthorized("admin"),
  deleteUser
);

export default router;
