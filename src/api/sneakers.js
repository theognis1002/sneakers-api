const express = require("express");
const router = express.Router();
const monk = require("monk");
const Joi = require("@hapi/joi");

const db = monk(process.env.MONGO_URI);
const sneakers = db.get("sneakers");

const schema = Joi.object({
	username: Joi.string().trim().required(),
	email: Joi.string().trim().required(),
});

// GET ALL
router.get("/", async (req, res, next) => {
	try {
		const items = await sneakers.find({});
		res.json(items);
	} catch (error) {
		next(error);
	}
});

// GET ONE
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const item = await sneakers.findOne({
			_id: id,
		});
		if (!item) return next();
		return res.json(item);
	} catch (error) {
		next(error);
	}
});

// CREATE ONE
router.post("/", async (req, res, next) => {
	try {
		const value = await schema.validateAsync(req.body);
		const inserted = await sneakers.insert(value);
		res.json(inserted);
	} catch (error) {
		next(error);
	}
});

// UPDATE ONE
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const item = await sneakers.findOne({
			_id: id,
		});
		if (!item) return next();
		const value = await schema.validateAsync(req.body);
		const updated = await sneakers.update(
			{
				_id: id,
			},
			{
				$set: value,
			}
		);
		res.json(value);
	} catch (error) {
		next(error);
	}
});

// DELETE ONE
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		await sneakers.remove({
			_id: id,
		});
		res.json({
			message: "Successfully deleted!",
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
