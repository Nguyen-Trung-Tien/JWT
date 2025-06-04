require("dotenv").config();
const jwt = require("jsonwebtoken");
const { create } = require("../models/user");

const auth = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];
  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      // verify token

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
          createBy: decoded.name,
        };
        console.log("Check_TOKEN>>>>", decoded);
      } catch (error) {
        res.status(401).json({
          message: "Access Token ko hop le",
        });
      }
      next();
    } else {
      // return exception
      res.status(401).json({
        message: "Access Token Header",
      });
    }
  }
};

module.exports = auth;
