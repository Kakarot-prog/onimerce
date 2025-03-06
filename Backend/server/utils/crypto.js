// Imports
import crypto from "crypto";

// Generate a random token
export const resetPassToken = () => {
  return crypto.randomBytes(20).toString("hex");
};
