const bookRouter = require("./book");
const siteRouter = require("./site");

const route = (app) => {
  app.use("/", siteRouter);
  app.use("/", bookRouter);
};
module.exports = route;
