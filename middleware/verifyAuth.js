const jwt = require("jsonwebtoken");
module.exports.verifyAuth = function (req, res, next) {
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];
  console.log({ token, header: req.headers});
  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ status: false, message: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};
