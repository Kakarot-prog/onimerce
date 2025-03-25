import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const sendToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user.id }, KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default sendToken;
