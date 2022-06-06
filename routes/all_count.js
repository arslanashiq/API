const { Order } = require("../models/order");
const { User } = require("../models/user");
const { FoodCategory } = require("../models/foodcategory");
const { Product } = require("../models/product");
const { Recent } = require("../models/recent");
const { Recomended } = require("../models/recomended");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  try {
    const ordercount = await Order.find().count();
    const orderpendingcount = await Order.find({status:"Pending"}).count();
    const orderwaitingcount = await Order.find({status:"Waiting"}).count();
    const ordercompletecount = await Order.find({status:"Complete"}).count();
    const orderdeliveredcount = await Order.find({status:"Delivered"}).count();
    const usercount = await User.find().count();
    const categorycount = await FoodCategory.find().count();
    const productcount = await Product.find().count();
    const recentcount = await Recent.find().count();
    const recomendedcount = await Recomended.find().count();

    const list = {
      ordercount,
      orderpendingcount,
      orderwaitingcount,
      ordercompletecount,
      orderdeliveredcount,
      usercount,
      categorycount,
      productcount,
      recentcount,
      recomendedcount,
    };
    res.send({ list, status: 200 });
  } catch (error) {
    return res.send({ status: 500 });
  }
});

module.exports = router;
