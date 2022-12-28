const express = require("express");
const {api1, api1_2, api3, api4, } = require("../controllers/api");
const router = express.Router();

router.get("/1", api1)
router.get("/2", api1_2)
router.get("/3", api3)
router.get("/4", api4)

module.exports = router;