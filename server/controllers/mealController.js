const Meal = require("../models/mealModel");
const Rating = require("../models/ratingModel");
const getMeals = async (req, res) => {
  const meals = await Meal.find();

  if (!meals) {
    res.status(404);
    throw new Error("Meals Not Found");
  }

  res.status(200).json(meals);
};

const getMeal = async (req, res) => {
  const meal = await Meal.findById(req.params.mid);

  if (!meal) {
    res.status(404);
    throw new Error("Meal Not Found");
  }
  const rating = await Rating.find({ meal: meal._id }).populate('user') ;
  
  if (!rating) {
   
    res.status(200).json(meal);
  }
  
  res.status(200).json({
    _id: meal._id,
    name: meal.name,
    image: meal.image,
    description: meal.description,
    price: meal.price,
    isveg: meal.isVeg,
    isActive: meal.isActive,
    rating: rating,
  });
};

module.exports = { getMeals, getMeal };
