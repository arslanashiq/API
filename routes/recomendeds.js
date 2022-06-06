const { Recomended } = require("../models/recomended");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const recomendedList = await Recomended.find();

  if (!recomendedList) {
    res.status(500).json({ success: false });
  }
  res.send({ recomendedList, status: 200 });
});

router.post(`/`, async (req, res) => {
  let recomended = new Recomended({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image,
    info: req.body.info,
    list: req.body.list,
    category: req.body.category,
  });
  recomended = await recomended.save();

  if (!recomended) {
    return res.status(500).send("The User cannot be created");
  }

  res.send({ recomended, status: 200 });
});

router.get(`/:id`, async (req, res) => {
  const product = await Recomended.find({ _id: req.params.id });
  // console.log(product)
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send({ product, status: 200 });
});

router.delete("/:id", (req, res) => {
  Recomended.findByIdAndRemove(req.params.id)
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
  const product = await Recomended.findOneAndUpdate(
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
