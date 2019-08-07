const express = require('express');

const app = express();

const user = require('./user');
app.use('/user', user);

const pool = require('./pool');
app.use('/pool', pool);

app.listen(80);