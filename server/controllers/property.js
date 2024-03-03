const asyncHandler = require("express-async-handler");
const db = require("../models");
const createNewProperty = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.Property.findOrCreate({
    where: { name },
    defaults: req.body,
  });

  const propertyId = response[0]?.id;

  if (propertyId) {
    const departmentId = [];
    if (req.body?.departmentId) {
      departmentId.push(req.body?.departmentId);
    }

    //Build bulker for propertyDepartments
    const propertyDepartments = departmentId.map((el) => ({
      propertyId,
      departmentId: el,
    }));
    const update = await db.PropertyDepartment.bulkCreate(propertyDepartments, {
      ignoreDuplicates: true,
    });
    if (!update) await db.Property.destroy({ where: { id: response[0].id } });
  }
  return res.json({
    success: Boolean(response),
    mes: response
      ? "Create new property successfully"
      : "Create new property failed",
  });
});
module.exports = {
  createNewProperty,
  getProperties: asyncHandler(async (req, res) => {
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
      const response = await db.Property.findAll({
        where: query,
        ...options,
      });
      return res.json({
        success: response.length > 0,
        mes: response
          ? "Get all properties successfully"
          : "Get all properties failed",
        properties: response,
      });
    }
    //Pagination
    const prevPage = page - 1 > 0 ? page - 1 : 1;

    const offset = (page - 1) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;
    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Get properties successfully" : "Get properties failed",
      properties: response,
    });
  }),
};
