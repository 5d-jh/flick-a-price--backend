const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { mongoose } = require('./modules/db_mongo');

const app = express();

mongoose.connect('mongodb://mongo_server/quaterflix', { useNewUrlParser: true });

app.use(express.json());
app.use(
  session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

const user = require('./user');
app.use('/user', user);

const pool = require('./pool');
app.use('/pool', pool);

app.listen(80);