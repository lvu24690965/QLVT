const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/department");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");

router.post(
  "/",
  verifyToken,
  //isAdmin,
  validateDto(
    Joi.object({ name: stringReq, description: stringReq, image: stringReq })
  ),
  ctrls.createNewDepartment
);
router.get("/", ctrls.getDepartments);
router.patch(
  "/:id",
  verifyToken,
  //isAdmin,
  validateDto(Joi.object({ name: string, description: string, image: string })),
  ctrls.updateDepartment
);
router.delete("/:id", verifyToken, isAdmin, ctrls.removeDepartment);
module.exports = router;
