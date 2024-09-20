import validator from "validator";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ Success: false, message: "User doesn't exist" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ Success: true, token });
    } else {
      res.json({ Success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ message: "User already exists" });
    }

    // validating email format and password length
    if (!validator.isEmail(email)) {
      return res.json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.json({ message: "Enter strong password" });
    }

    // hashing password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // creating user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ Success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: error.message });
  }
};

// Admin route for login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ Success: true, token });
    } else {
      res.json({ Success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
