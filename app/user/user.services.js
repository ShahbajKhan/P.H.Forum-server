const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createNewUser = async (userInfo) => {
  const { name, email, password, role } = userInfo;
  // create new user
  const user = await new User({ name, email, password, role });
  // hash user password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  // return jwt
  return generateToken(user._id);
};

const loginAnUser = async (providedInfo, matchedUser) => {
  const { email, password } = providedInfo;
  const { user } = matchedUser;
  // check is the encrypted password matches
  const isMatchingPassword = await bcrypt.compare(password, user.password);
  console.log({ isMatchingPassword });
  if (!isMatchingPassword) {
    throw new Error("Incorrect Password!");
  }
  return generateToken(user._id);
};

const generateToken = async (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

const getUser = async (userId) => {
  const user = await User.findById(userId, "-password");
  if (!user) {
    throw new Error("No user found!");
  }
  return user;
};
module.exports = {
  createNewUser,
  loginAnUser,
  getUser,
};
