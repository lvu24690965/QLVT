const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const createNewDepartment = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.Department.findOrCreate({
    where: { name },
    defaults: req.body,
  });
  return res.json({
    success: response[1],
    mes: response
      ? "Create new property type successfully"
      : "Create new property type failed",
    departments: response[0],
  });
});

const getDepartments = asyncHandler(async (req, res) => {
  const { limit, page, fields, type, name, sort, ...query } = req.query;
  const options = {};
  if (fields) {
    const attributes = fields.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));
    if (isExclude)
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    else options.attributes = attributes;
  }
  if (name)
    query.name = db.Sequelize.where(
      db.Sequelize.fn("LOWER", db.Sequelize.col("name")),
      "LIKE",
      `%${name.toLowerCase()}%`
    );
  //Sorting
  //order = [[createdAt,ASC ], [name , DESC]]
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );
    options.order = order;
  }

  if (!limit) {
    const response = await db.Department.findAll({
      where: query,
      ...options,
    });
    return res.json({
      success: response.length > 0,
      mes: response
        ? "Get all departments successfully"
        : "Get all departments failed",
      departments: response,
    });
  }
  //Pagination
  const prevPage = page - 1 > 0 ? page - 1 : 1;

  const offset = (page - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.Department.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response.length > 0,
    mes: response ? "Get departments successfully" : "Get departments failed",
    departments: response,
  });
});

const updateDepartment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(400, "No data to update", res, next);
  const response = await db.Department.update(req.body, {
    where: { id },
  });
  return res.json({
    success: response[0] > 0,
    mes: response[0]
      ? "Update departments successfully"
      : "Update departments failed",
  });
});

const removeDepartment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await db.Department.destroy({ where: { id } });
  return res.json({
    success: response > 0,
    mes: response
      ? "Remove departments successfully"
      : "Remove departments failed",
  });
});
module.exports = {
  createNewDepartment,
  getDepartments,
  updateDepartment,
  removeDepartment,
};
