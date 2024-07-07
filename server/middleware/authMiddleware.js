import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

import jwt from "jsonwebtoken";
import sendResponse from "../lib/responseHelper.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return sendResponse(res, 401, "Not Authenticated");

  const token = authHeader.split(" ")[1];

  if (!token) return sendResponse(res, 401, "Not Authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log(err);
      return sendResponse(res, 403, "Token is not valid");
    }
    req.userId = payload.id;
    next();
  });
};
