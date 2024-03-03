const router = require("express").Router();
const ctrls = require("../controllers/insert");

router.post("/roles", ctrls.initRoles);
router.post("/departments", ctrls.initDepartment);
module.exports = router;
