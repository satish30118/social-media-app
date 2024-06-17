const User = require("../model/User");
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User got success",
      details: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = getUser;
