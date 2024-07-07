import sendResponse from "../lib/responseHelper.js";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    console.log("Registration attempt");
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, "Username and password are required");
    }

    if (password.length < 8) {
      return sendResponse(res, 400, "Password must be at least 8 characters");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendResponse(res, 400, "Username is already taken");
    }

    const newUser = await User.create({
      username,
      password,
      profilePicture: `https://ui-avatars.com/api/?name=${username}`,
    });

    console.log("User registered successfully");
    sendResponse(res, 201, "User registered successfully", {
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.error("User registration failed", error);
    sendResponse(res, 500, "User registration failed");
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login attempt");
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, "Username and password are required");
    }

    // Explicitly select the password field
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return sendResponse(res, 404, "Invalid username or password");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, "Invalid username or password");
    }

    const token = user.generateJsonWebToken();

    const { password: userPassword, ...userInfo } = user.toObject();

    res.status(200).json({ token, userInfo });
  } catch (error) {
    console.error("Login failed", error);
    sendResponse(res, 500, "Login failed");
  }
};

export const logout = (req, res) => {
  sendResponse(res, 200, "User logged out successfully");
};
