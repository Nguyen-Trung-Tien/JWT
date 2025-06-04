const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");
const routerAPI = express.Router();

routerAPI.all("*", auth);
routerAPI.get("/", (req, res) => {
  return res.status(200).json("hello word");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/account", delay, getAccount);
routerAPI.get("/user", getUser);

module.exports = routerAPI; //export defaults
