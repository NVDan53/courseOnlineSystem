import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password } = req.body;
    // validate
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExit = await User.findOne({ email }).exec();
    if (userExit) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    // console.log("Save user:", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send("Error. Try again.");
  }
};

/* LOGIN
sever
-to login: need to check if user's password is correct
-we need to take user's password, hash it then compare with the hashed password saved
-then we need to generate json web token/ JWT send to client
-this will be used to access protected routes
*/
export const login = async (req, res) => {
  try {
    // req.body
    const { email, password } = req.body;
    console.log(req.body);
    // check if our db has email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");
    //create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    res.json(user);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send("Error. Try again.");
  }
};

// Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout success" });
  } catch (error) {
    return res.status(400).send("Error. Try again.");
  }
};

// Verify current user
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("CURRENT USER: ", user);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send("Error. Try again.");
  }
};
