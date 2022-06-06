const { FoodCategory } = require("../models/foodcategory");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const foodcategoryList = await FoodCategory.find();

  if (!foodcategoryList) {
    res.status(500).json({ success: false });
  }
  res.send({foodcategoryList,status:200});
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

  res.send({foodcategory,status:200});
});



module.exports = router;
