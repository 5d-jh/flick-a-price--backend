const { User } = require('./modules/mongo_models');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/create', async (req, res, next) => {
  new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    hasNetflixAccount: false
  }).save()
  .then(
    () => res.sendStatus(200)
  )
  .catch(
    err => next(err)
  );
});

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  .catch(
    err => next(err)
  );

  const pass = !(
    user && await bcrypt.compare(req.body.password, user.password)
  );
  if (pass) {
    return res.status(403).send('Username or password are not correct');
  }

  req.session.email = user.email;
  res.sendStatus(200);  
});

router.get('/logout', async (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

module.exports = router;