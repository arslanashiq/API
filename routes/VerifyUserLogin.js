const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post(`/`, async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    passwordHash: req.body.passwordHash,
  });

  if (!user) {
    const users = {
      email: req.body.email,
      passwordHash: req.body.passwordHash,
    };
    res.send({ users, status: 500 });
  } else {
    if (user.isAdmin) {
      res.send({ user, status: 300 });
    } else {
      res.send({ user, status: 200 });
    }
  }
});

module.exports = router;
