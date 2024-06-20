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

const getBySearch = async (req, res) => {
  try {
    const { name } = req.params;
    const searchedUsers = await User.aggregate([
      {
        $search: {
          index: "userSearch",
          text: {
            query: name,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
    ]);
    res.status(200).send({
      success:true,
      message: `All users with  ${name}`,
      details: searchedUsers,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING Single search ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = { getUser, getBySearch };
