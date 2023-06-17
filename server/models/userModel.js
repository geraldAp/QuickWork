const mongoose = require("mongoose");
// for security
const bcrypt = require("bcrypt");
// for validation
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "developer"],
    default: "developer",
  },
});

// hashing the passwords before saving them to the database

//static signup method because it's a static method you can't use an arrow function
userSchema.statics.signup = async function (
  userName,
  email,
  password,
  role
) {
  // validation
  // 1)checking to see if we do not have a value for email and password
  if (!userName || !email || !password) {
    throw Error("All fields must be filled");
  }
  // if not valid
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  // if not strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  // name validation
  if (!validator.matches(userName, /^[A-Za-z\s\-]+$/)) {
    throw new Error(
      "Full name can only contain alphabetic characters, spaces, and hyphens"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //   generating the salt and hashing it
  const salt = await bcrypt.genSalt(10); //10 is th default value
  const hash = await bcrypt.hash(password, salt); // creating the hash that takes two argument the password and the salt

  const user = await this.create({ userName, role, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // trying to find the user in that data base with the email provided
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  // comparing the password hashes to enable login
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  // Include username and role in the returned user object
  return {
    email: user.email,
    userName: user.userName,
    role: user.role,
    _id : user._id
  };
};

module.exports = mongoose.model("DownWorkUser", userSchema);
