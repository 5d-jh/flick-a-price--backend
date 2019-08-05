const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

mongoose.connect('mongodb://mongo_server/quaterflix', { useNewUrlParser: true });

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasNetflixAccount: false,
  })
);

router.use(express.json());

router.post('/create', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    hasNetflixAccount: false
  });
  user.save();
  res.sendStatus(200);
});

router.get('/get', async (req, res) => {
  User.find((err, doc) => {
    res.json(doc);
  })
})

module.exports = router;