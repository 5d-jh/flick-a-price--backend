const { create, retrieve, model } = require('./modules/db_mongo');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/create', async (req, res) => {
  create(model.User, {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    hasNetflixAccount: false
  })
  .then(
    () => res.sendStatus(200)
  )
  .catch(
    err => {
      res.sendStatus(500);
      console.error(err);
    }
  );
});

router.post('/login', async (req, res) => {
  const [user] = await retrieve(model.User, { email: req.body.email });

  try {
    const pass = !(
      user && await bcrypt.compare(req.body.password, user.password)
    )
    if (pass) {
      return res.send('Username or password are not correct').status(403);
    }
  } catch (err) {
    console.error(err);
  }

  req.session.email = user.email;
  res.sendStatus(200);  
});

router.get('/get', (_, res) => {
  retrieve(model.User, {})
  .then(
    doc => res.json(doc)
  )
  .catch(
    err => {
      res.sendStatus(500);
      console.error(err);
    }
  );
});

module.exports = router;