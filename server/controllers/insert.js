const asyncHandler = require("express-async-handler");
const db = require("../models");
const { roles, departments } = require("../utils/constants");
const initRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.bulkCreate(roles);
  return res.json({
    success: Boolean(response),
    mes: response ? "Insert roles successfully" : "Insert roles failed",
    currentUser: response,
  });
});
const initDepartment = asyncHandler(async (req, res) => {
  const response = await db.Department.bulkCreate(departments);
  return res.json({
    success: Boolean(response),
    mes: response ? "Insert roles successfully" : "Insert roles failed",
    currentUser: response,
  });
});
module.exports = { initRoles, initDepartment };
