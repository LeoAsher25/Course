const express = require("express");
let router = express.Router();

const coursesRouter = require("./courses");
// const searchRouter = require("../search");
// const siteRouter = require("../site");
// const meRouter = require("../me");

const initAPIRoute = (app) => {
  app.use("/api/courses", coursesRouter);
  //   app.use("/api/search", searchRouter);
  //   app.use("/api/me", meRouter);
  //   app.use("/api/", siteRouter);
};

module.exports = initAPIRoute;
