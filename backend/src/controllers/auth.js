const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounts = 10;
require("dotenv").config();

const register = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const username = firstName + " " + lastName;
  try {
    let check = await User.find({
      $or: [
        { email },
        {
          username,
        },
      ],
    });

    if (check.length !== 0)
      return res.status(400).send("User name or email aleady registers");

      const salt = await bcrypt.genSalt(saltRounts);
    const HassPassword = await bcrypt.hash(password, salt);
    req.body["password"] = HassPassword;

    const newUser = new User({
      username,
      email,
      password: req.body.password
    });

    await newUser.save();
    return res.status(201).json({ message: "Account Created Successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return res.status(400).json("please enter user name");
    if (!password) return res.status(400).json("please enter  password");
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json("Wrong user name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_key
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword)
      return res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    return res.status(200).send({ user, accessToken });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login };
