const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const validateDto = require("../middlewares/validation");
const {
  string,
  number,
  stringReq,
  numberReq,
} = require("../middlewares/joiSchema");
router.post(
  "/signup",
  validateDto(
    Joi.object({
      name: stringReq,
      phone: numberReq,
      password: stringReq,
      roleCode: string,
      departmentId: number,
    })
  ),
  ctrls.register
);

router.post(
  "/signin",
  validateDto(
    Joi.object({
      phone: numberReq,
      password: stringReq,
    })
  ),
  ctrls.signIn
);

module.exports = router;
