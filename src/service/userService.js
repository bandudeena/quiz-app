import User from "../models/user.js";
import jwt from "jsonwebtoken";
const userService = {};

userService.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.query().insert({ username, email, password });
    const token = user.generateAuthToken();
    const response = {
      success: true,
      errors: null,
      data: { user, token },
    };
    res.status(201).json(response);
  } catch (err) {
    const response = {
      success: false,
      errors: [500],
      data: null,
    };
    res.status(500).json(response);
  }
};

userService.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.query().findOne({ email });
    if (!user) {
      const response = {
        success: false,
        errors: [401],
        data: null,
      };
      return res.status(401).json(response);
    }
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      const response = {
        success: false,
        errors: [401],
        data: null,
      };
      return res.status(401).json(response);
    }
    const token = user.generateAuthToken();
    const response = {
      success: true,
      errors: null,
      data: { user, token },
    };
    res.status(200).json(response);
  } catch (err) {
    const response = {
      success: false,
      errors: [500],
      data: null,
    };
    res.status(500).json(response);
  }
};

userService.getCurrentUser = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.query().findById(decoded.id);
};
export default userService;
