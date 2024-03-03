const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/property");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const validateDto = require("../middlewares/validation");
const { stringReq, booleanReq, string } = require("../middlewares/joiSchema");

router.get("/", ctrls.getProperties);
router.post(
  "/",
  verifyToken,
  //isAdmin,
  validateDto(
    Joi.object({
      name: stringReq,
      statusType: stringReq,
      isAvalable: booleanReq,
      propertyTypeId: stringReq,
      description: string,
      images: stringReq,
      departmentId: stringReq,
      postedBy: stringReq,
      description: string,
    })
  ),
  ctrls.createNewProperty
);
module.exports = router;
