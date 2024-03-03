const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/departments", ctrls.getDepartments);
router.get("/roles", ctrls.getRoles);
module.exports = router;
