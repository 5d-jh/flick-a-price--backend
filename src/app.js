const express = require('express');

const app = express();

const user = require('./modules/user');
app.use('/user', user);

const pool = require('./modules/pool');
app.use('/pool', pool);

module.exports = app;