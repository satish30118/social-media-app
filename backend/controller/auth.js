const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

/* REGISTER USER */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (req.file) {
      var picturePath = req.file?.path;
    }
  

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User({
      name,
      email,
      password: passwordHash,
      picturePath,
    }).save();
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
    delete newUser?.password;

    res.status(201).json({
      success: true,
      message: "Register successfull!!",
      token,
      details: newUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err)
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(203)
        .json({ success: false, message: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(203)
        .json({ success: false, message: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    delete user.password;
    res
      .status(200)
      .json({ success: false, message: "Login Success", token, details: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
