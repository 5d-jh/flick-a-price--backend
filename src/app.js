const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('hi everybody!')
});

const pool = require('./modules/pool');
app.use('/redis', pool);

module.exports = app;