const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const productlist = await Product.find();

  if (!productlist) {
    res.status(500).json({ success: false });
  }
  res.send({ productlist, status: 200 });
});

router.post(`/`, async (req, res) => {
  // console.log(req.body)
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image,
    list: req.body.list,
    category: req.body.category,
    info: req.body.info,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send("The product cannot be created");
  }

  res.send({ product, status: 200 });
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.find({ _id: req.params.id });
  // console.log(product)
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send({ product, status: 200 });
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
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
  const product = await Product.findOneAndUpdate(
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
