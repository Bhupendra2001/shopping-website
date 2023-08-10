const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounts = 10;
require("dotenv").config();

const register = async (req, res) => {
  const { firstName, lastName, email , password} = req.body;
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
   

    const newUser = new User({
      username,
      email,
      password : HassPassword
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
    const getUser = await User.findOne({ username });

    if (!getUser) return res.status(401).json("Wrong user name");

   
    const matchPassword = await bcrypt.compare(password, getUser.password);
   
    if (!matchPassword)
   
      return res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        userId: getUser._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    return res.status(200).send({ getUser, accessToken });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login };
