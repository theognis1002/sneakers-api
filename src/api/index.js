const express = require("express");

const emojis = require("./emojis");
const sneakers = require("./sneakers");

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API - 👋🌎🌍🌏",
	});
});

console.log("test");

router.use("/emojis", emojis);
router.use("/sneakers", sneakers);
module.exports = router;
