import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_DB;

mongoose
  .connect(url)
  .then(console.log("connection is connected"))
  .catch((err) => console.log(err));
