const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send({ userList , status: 200 });
});

router.post(`/`, async (req, res) => {
  let user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) {
    return res.status(500).send("The User cannot be created");
  }

  res.send({ user, status: 200 });
});

router.put(`/:id`, async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      passwordHash:req.body.passwordHash,
      bio:req.body.bio
    }
  );
  console.log(req.params.id)
  
  if (!user) {
    res.send("Not Done");
  }

  res.send({user,status:200});
});

module.exports = router;
