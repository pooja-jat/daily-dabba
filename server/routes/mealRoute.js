const express = require("express");
const { getMeals, getMeal } = require("../controllers/mealController");

const router = express.Router();

router.get("/:mid", getMeal);
router.get("/", getMeals);

module.exports = router;
