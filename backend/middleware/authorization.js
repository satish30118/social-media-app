const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
      return res.status(401).send({
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
      if(!decoded){
        return res.status(403).send({
          success: false,
          message: "Login Expired, Please Login",
        });
      }
      
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
};
