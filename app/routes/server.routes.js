const router = require("express").Router();
const serverService = require("../services/server.service");

router.get("/server", serverService.serverStatus);
router.get("/database", serverService.databaseStatus);

module.exports = router;