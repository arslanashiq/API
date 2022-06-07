const { FoodCategory } = require("../models/foodcategory");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../models/order");

router.get(`/`, async (req, res) => {
  const foodcategoryList = await FoodCategory.find();

  if (!foodcategoryList) {
    res.status(500).json({ success: false });
  }
  res.send({ foodcategoryList, status: 200 });
});

router.post(`/`, async (req, res) => {
  let foodcategory = new FoodCategory({
    name: req.body.name,
    image: req.body.image,
  });
  foodcategory = await foodcategory.save();

  if (!foodcategory) {
    return res.status(500).send("The User cannot be created");
  }

  res.send({ foodcategory, status: 200 });
});

router.get(`/:id`, async (req, res) => {
  const foodcategory = await FoodCategory.find({ _id: req.params.id });
  // console.log(product)
  if (!foodcategory) {
    res.status(500).json({ success: false });
  }
  res.send({ foodcategory, status: 200 });
});

router.delete("/:id", (req, res) => {
  FoodCategory.findByIdAndRemove(req.params.id)
    .then((foodcategory) => {
      if (foodcategory) {
        res.send({ foodcategory, status: 200 });
      } else {
        res.send({ foodcategory, status: 100 });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.put(`/:id`, async (req, res) => {
  const foodcategory = await FoodCategory.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      image: req.body.image,
    }
  );

  if (!foodcategory) {
    res.send({ foodcategory, status: 100 });
  }
  res.send({ foodcategory, status: 200 });
});

module.exports = router;
