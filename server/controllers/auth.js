const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const register = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;
  const response = await db.User.findOrCreate({
    where: { phone: phone },
    defaults: {
      phone,
      password,
      name,
      departmentId: req.body?.departmentId,
    },
  });
  const userId = response[0]?.id;

  if (userId) {
    const roleCode = ["ROL5"];
    if (req.body?.roleCode) roleCode.push(req.body?.roleCode);
    //Build bulker for roleCode and departmentId
    const roleCodeBulker = roleCode.map((el) => ({
      userId,
      roleCode: el,
    }));

    //Insert to UserRole and UserDepartment
    const update = await db.User_Role.bulkCreate(roleCodeBulker, {
      ignoreDuplicates: true,
    });
    if (!update) await db.User.destroy({ where: { id: userId } });
  }
  return res.json({
    success: response[1],
    mes: response[1] ? "Register success" : "Phone is exist",
  });
});

const signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await db.User.findOne({ where: { phone } });
  if (!user) {
    return throwErrorWithStatus(401, "Phone is not exist", res, next);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return throwErrorWithStatus(401, "Password is incorrect", res, next);
  }
  const token = jwt.sign(
    { uid: user.id, roleCode: user.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return res.json({
    success: true,
    mes: "Sign in is successfully",
    accessToken: token,
  });
});
module.exports = { register, signIn };
