const asyncHandler = require("express-async-handler");
const db = require("../models");
const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    attributes: { exclude: ["password"] },
    nest: false,
    include: [
      {
        model: db.User_Role,
        as: "userRoles",
        attributes: ["roleCode"],
        include: [
          {
            model: db.Role,
            as: "roleName",
            attributes: ["value"],
          },
        ],
      },
      {
        model: db.Department,
        as: "department",
        attributes: ["name"],
      },
    ],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Get current user successfully" : "Get current user failed",
    currentUser: response,
  });
});
const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ["roleCode", "value"],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Get roles successfully" : "Get roles failed",
    roles: response,
  });
});
const getDepartments = asyncHandler(async (req, res) => {
  const response = await db.Department.findAll({
    attributes: ["id", "name"],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Get departments successfully" : "Get departments failed",
    departments: response,
  });
});
module.exports = { getRoles, getCurrent, getDepartments };
