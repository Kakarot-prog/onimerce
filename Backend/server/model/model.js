import { model, Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: ["please enter a name", true],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: ["please enter a email", true],

      unique: true,
      validate: [validator.isEmail, "put a valid email address"],
    },
    password: {
      type: String,
      required: ["please enter a password", true],

      validate: [validator.isStrongPassword, "put a strong passowrd"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user", "seller"],
      },
    },
    avatar: {
      type: String,
      default: "example.png",
    },
    resetPassToken: {
      type: String,
    },
    resetPassExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = model("users", userSchema);

export default Auth;
