const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.User,
    pass: process.env.Password,
  },
});


const sendWelcomeEmail = async (email) => {
  const message =
    "Thank you for subscribing to our website!\n\nWe are thrilled to have you on board. You will now receive updates, news, and special offers related to our shopping website project.\n\nIf you have any questions or need assistance, feel free to reach out to us.\n\nHappy reading!\n\n- The Product Management Team";

  const mailOption = {
    from: process.env.User,
    to: email,
    subject: "Welcome to Product Management Project",
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Welcome message sent successfully!");
    return info; // Return the info if needed for further processing
  } catch (error) {
    console.log("Error sending the welcome message: ", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


const SendMail = async (req, res) => {
  try {
    const email = req.params.email;

    console.log(email);
    await sendWelcomeEmail(email);

    return res
      .status(200)
      .send({ message: "Welcome email sent successfully!" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error sending the welcome email." });
  }
};




const sendForgetEmail = async (user) => {
  try {
    // Generate a reset token and set expiration time
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SEC,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Update user's resetToken and resetTokenExpiration in the database
    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpiration: Date.now() + 3600000, // 1 hour from now
    });

    // Send reset link to user's email
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
   
    const mailOptions = {
      from:  process.env.User,
      to: user.email, // Use the user's email
      subject: "Password Reset",
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome message sent successfully!");
    return info; // Return the info if needed for further processing
  } catch (error) {
    console.log("Error sending the forgot password message: ", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const forgotPassword = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json("Wrong username");
    }

    await sendForgetEmail(user);

    return res
      .status(200)
      .send("Forget password email sent successfully!");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { SendMail  , forgotPassword};
