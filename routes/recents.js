const { Recent } = require("../models/recent");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const recentList = await Recent.find();

  if (!recentList) {
    res.status(500).json({ success: false });
  }
  res.send({ recentList, status: 200 });
});

router.post(`/`, async (req, res) => {
  let recent = new Recent({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image,
    info: req.body.info,
    list: req.body.list,
    category: req.body.category,
  });
  recent = await recent.save();

  if (!recent) {
    return res.status(500).send("The User cannot be created");
  }

  res.send({ recent, status: 200 });
});

router.get(`/:id`, async (req, res) => {
  const product = await Recent.find({ _id: req.params.id });
  // console.log(product)
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send({ product, status: 200 });
});

router.delete("/:id", (req, res) => {
  Recent.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        res.send({ product, status: 200 });
      } else {
        res.send({ product, status: 100 });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.put(`/:id`, async (req, res) => {
  console.log(req.body.id);
  const product = await Recent.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      image: req.body.image,
      list: req.body.list,
      category: req.body.category,
      info: req.body.info,
    }
  );

  if (!product) {
    res.send({ product, status: 100 });
  }
  res.send({ product, status: 200 });
});

module.exports = router;
