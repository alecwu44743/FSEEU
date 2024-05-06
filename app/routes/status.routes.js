const router = require("express").Router();
const statusService = require("../services/status.service");

router.get("/server", statusService.serverStatus);
router.get("/database", statusService.databaseStatus);

module.exports = router;