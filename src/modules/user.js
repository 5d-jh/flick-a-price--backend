const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/quaterflix');

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasNetflixAccount: false,
  })
);

router.post('/create', async (req, res) => {
  console.log(req.body.email, req.body.password)
  const user = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    hasNetflixAccount: false
  });
  user.save();
  res.sendStatus(200);
});

module.exports = router;