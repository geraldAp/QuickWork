const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// creating this function to generate jwt tokens for both login and signup

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };

  // login a user
const loginUser = async (req, res) => {
  const { email, password,  } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email,role:user.role , userName:user.userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
const signupUser = async (req, res) => {
  const {userName, email, password,role } = req.body;

  try {
    const user = await User.signup(userName,email, password,role);

    // create a token
    // after the users have been saved to the database lets create a token
    const token = createToken(user._id);
    res.status(200).json({ email,userName,role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };