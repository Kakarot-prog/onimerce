// Imports
import crypto from "crypto";

// Generate a randokom ten
export const resetPassToken = () => {
  return crypto.randomBytes(20).toString("hex");
};
