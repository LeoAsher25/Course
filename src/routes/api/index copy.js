const searchRouter = require("./search");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const meRouter = require("./me");

const route = (app) => {
  app.use("/search", searchRouter);
  app.use("/courses", coursesRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);
};
module.exports = route;
