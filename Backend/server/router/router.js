import { Router } from "express";
import {
  deleteMyProfile,
  deleteUser,
  deleteAvatar,
  forgotPass,
  loginUser,
  logoutUser,
  myProfile,
  resetPass,
  resetForgotPass,
  allUsers,
  singleUser,
  updateProfile,
  userRegister,
  verifyUser,
} from "../controller/controller.js";
import { upload } from "../utils/multer.js";
import { isAuthenticate, isAuthorized } from "../utils/authentication.js";
import { limiter } from "../utils/rateLimiter.js";

const router = Router();

router.post("/register", upload.single("avatar"), userRegister);

router.get("/verify", verifyUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/resetPass", isAuthenticate, resetPass);

router.post("/forgot/password", forgotPass);

router.post("/auth/forgot/:token", resetForgotPass);

router.get("/get/profile", isAuthenticate, myProfile);

router.delete("/delete/profile", isAuthenticate, deleteMyProfile);

router.put(
  "/user/update",
  isAuthenticate,
  upload.single("file"),
  limiter,
  updateProfile
);

router.delete("/delete/avatar", isAuthenticate, deleteAvatar);

router.delete(
  "/admin/reject/:id",
  isAuthenticate,
  isAuthorized("admin"),
  deleteUser
);

router.get("/user/get/all", isAuthenticate, isAuthorized("admin"), allUsers);

router.get(
  "/user/get/single",
  isAuthenticate,
  isAuthorized("admin"),
  singleUser
);

router.delete(
  "/user/admin/delete/:id",
  isAuthenticate,
  isAuthorized("admin"),
  deleteUser
);

export default router;
