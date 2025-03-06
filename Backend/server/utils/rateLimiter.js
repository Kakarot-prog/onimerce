import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message:
    "So you have reach the end of limits please try again later donot cross the limit you m**on",
});
