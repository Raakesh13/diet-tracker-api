const express = require("express");
const router = express.Router();
const Meal = require("../models/Meals");
const auth = require("../middleware/auth");

router.post("/meals", auth, async (req, res) => {
  const meal = new Meal({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await meal.save();
    res.status(201).send(meal);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/meals", auth, async (req, res) => {
  const sort = {};

  if (req.query.sortBy) {
    const part = req.query.sortBy.split(":");
    sort[part[0]] = part[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "meals",
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.meals);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/meals/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const meal = await Meal.findOne({ _id, owner: req.user._id });

    if (!meal) {
      return res.status(404).send();
    }
    res.status(200).send(meal);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/meals/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "foodName",
    "calories",
    "description",
    "imageURL",
    "date",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!meal) {
      return res.status(404).send();
    }

    updates.forEach((update) => (meal[update] = req.body[update]));

    await meal.save();

    res.send(meal);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/meals/:id", auth, async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!meal) {
      return res.status(404).send();
    }

    res.send(meal);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
