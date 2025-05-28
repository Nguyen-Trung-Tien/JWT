require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    // hash user
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // save user
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "tien",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    //fetch user by email
    const user = await User.findOne({ email: email });
    if (user) {
      //compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return { EC: 2, EM: "Email/Password không hợp lệ" };
      } else {
        // create an access token
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
      }
    } else {
      return { EC: 1, EM: "Email/Password không hợp lệ" };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUserService,
  loginService,
};
