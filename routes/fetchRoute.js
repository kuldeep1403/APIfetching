const express = require("express");
const { getAllData } = require("../controller/bitCoinController");
const router = express.Router();

router.get("/bitcoin", getAllData);

module.exports = router;
