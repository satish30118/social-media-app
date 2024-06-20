const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  // console.log("Req Token ", token);
  if (!token)
    return res.status(203).send({
      success: false,
      message: "Access denied. No token",
    });

  try {
    const secretKey = process.env.JWT_KEY;
    if (!secretKey) {
      console.log("Can't get secret key");
      return;
    }
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded; // Store decoded user information in req
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    console.log("ERROR IN JWT VERIFICATION: " + err);
    res.send({
      success: false,
      message: "Login Expired, Please Login!!",
    });
  }
};
