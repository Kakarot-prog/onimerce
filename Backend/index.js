import express from "express";
import dotenv from "dotenv";
import "./server/db/db.js";
import router from "./server/router/router.js";
import cookieParser from "cookie-parser";
import { limiter } from "./server/utils/rateLimiter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1", router);

const Port = process.env.PORT;

const DEV = process.env.DEV;
app.listen(Port, () => {
  console.log(`the server is running on ${Port} in ${DEV} mode`);
});
