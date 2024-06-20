const jwt = require("jsonwebtoken");

const genrateToken = (user) => {
  const secretKey = process.env.JWT_KEY;
  if(!secretKey){
    console.log("Can't get secret key")
    return;
  }
  try {
    return jwt.sign({user}, secretKey, { expiresIn: "30d" });
  } catch (error) {
    console.log("ERROR IN TOKEN GENRATION " + error);
  }
};

module.exports = { genrateToken };
