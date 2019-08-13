const { create, retrieve, model } = require('./modules/db_mongo');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/create', async (req, res, next) => {
  create(model.User, {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    hasNetflixAccount: false
  })
  .then(
    () => res.sendStatus(200)
  )
  .catch(
    err => next(err)
  );
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await retrieve(model.User, { email: req.body.email });

    const pass = !(
      user && await bcrypt.compare(req.body.password, user.password)
    )
    if (pass) {
      return res.status(403).send('Username or password are not correct');
    }
  } catch (err) {
    return next(err);
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

router.get('/get', (_, res, next) => {
  retrieve(model.User, {})
  .then(
    doc => res.json(doc)
  )
  .catch(
    err => next(err)
  );
});

module.exports = router;