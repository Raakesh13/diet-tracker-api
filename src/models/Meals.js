const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
    },
    description: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
