const mongo = require('./modules/db_mongo');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use(express.json());

require('mongoose').connect('mongodb://mongo_server/quaterflix', { useNewUrlParser: true });

router.post('/create', async (req, res) => {
  mongo.create(mongo.model.User, {
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

router.get('/get', (_, res) => {
  mongo.retrieve(mongo.model.User, {})
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