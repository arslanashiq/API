const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const orderlist = await Order.find();

  if (!orderlist) {
    res.status(500).json({ status: false });
  }
  res.send({ orderlist, status: 200 });
});
//find orders by user id
router.get(`/:id`, async (req, res) => {
  const orderlist = await Order.find({ user_id: req.params.id });

  if (!orderlist) {
    res.status(500).json({ status: false });
  }
  res.send({ orderlist, status: 200 });
});

router.post(`/`, async (req, res) => {
  let order = await Order({
    user_id: req.body.user_id,
    user_detail: req.body.user_detail,
    order_detail: req.body.order_detail,
    total_price: req.body.total_price,
    order_time: req.body.order_time,
    status: req.body.status,
  });
  order = await order.save();

  if (!order) {
    return res.status(500).send("The Order cannot be created");
  }

  res.send({ order, status: 200 });
});

router.put(`delorder/:id`, async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: req.body.status,
    }
  );

  if (!order) {
    res.send("Not Done");
  }
  const orderlist = await Order.find();
  res.send({ orderlist, status: 200 });
});

router.delete("/:id", (req, res) => {
  const order = Order.findByIdAndRemove({_id:req.params.id);
  console.log(order)
  if (!order) {
    return res.send({ order, status: 100 });
  }
  return res.send({ order, status: 200 });
});

module.exports = router;
