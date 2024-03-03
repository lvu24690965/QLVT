const {
  errHandler,
  badRequestException,
} = require("../middlewares/errorHandler");
const auth = require("./auth");
const user = require("./user");
const insert = require("./insert");
const property = require("./property");
const propertyType = require("./propertyType");
const department = require("./department");
const initRoutes = (app) => {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/insert", insert);
  app.use("/api/property-type", propertyType);
  app.use("/api/properties", property);
  app.use("/api/department", department);
  app.use(badRequestException);
  app.use(errHandler);
};
module.exports = initRoutes;
