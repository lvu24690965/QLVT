const asyncHandler = require("express-async-handler");
const db = require("../models");
const { col } = require("sequelize");
const createNewProperty = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //insert to property where name = name
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
    const {
      limit,
      page,
      propertyType,
      department,
      fields,
      type,
      name,
      sort,
      ...query
    } = req.query;
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

    if (propertyType)
      query.propertyType = db.Sequelize.where(
        col("propertyTypeId"),
        propertyType
      );
    // Thêm điều kiện lọc theo department là trường name của bảng department
    if (department) {
      query["$propertyDepartment.departmentName.name$"] = department;
    }

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
        include: [
          {
            model: db.PropertyDepartment,
            as: "propertyDepartment",
            attributes: ["departmentId"],
            include: [
              {
                model: db.Department,
                as: "departmentName",
                attributes: ["name"],
              },
            ],
          },
        ],
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

    const offset = (page && +page > 1 ? +page - 1 : 0) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;
    const response = await db.Property.findAndCountAll({
      where: query,
      include: [
        {
          model: db.PropertyDepartment,
          as: "propertyDepartment",
          attributes: ["departmentId"],
          include: [
            {
              model: db.Department,
              as: "departmentName",
              attributes: ["name", "image"],
            },
          ],
        },
        {
          model: db.User,
          as: "rUser",
          attributes: ["name", "phone"],
        },
        {
          model: db.PropertyType,
          as: "propertyType",
          attributes: ["name"],
        },
      ],
      ...options,
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Get properties successfully" : "Get properties failed",
      properties: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    });
  }),
};
