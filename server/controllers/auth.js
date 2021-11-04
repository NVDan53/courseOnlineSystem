import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

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
