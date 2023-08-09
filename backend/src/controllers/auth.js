const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { uploadFile} = require('../aws')
require("dotenv").config();

const register = async (req, res) => {
  try {
    let check = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    });
    if (check) return res.status(400).send("User aleady registers");
    const newUser = new User({
      username: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.Pass_key
      ).toString(),
    });

    await newUser.save();
    return res.status(201).json({ message: "Account Created Successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if(!user) return res.status(401).json("Wrong user name");
   
   
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_key
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if( originalPassword != inputPassword )
    return  res.status(401).json("Wrong Password");

   

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).send({ ...others, accessToken });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};



module.exports = { register, login  }