//require all modules, set up port, create express app
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

// integrate bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Use session; create secret key for encryption
app.set('trust proxy', 1) // trust first proxy -- for development testing
app.use(session({
    name: 'session',
    secret: 'Id0n0tH8mean',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }, //5 minute timeout
}));

//require database.js config file
require('./server/config/database');

//serve angular files from 'dist' directory
app.use(express.static(path.join(__dirname, '/dist/bike-market')));

//load and use routes file
app.use('/api', require('./server/routes'));

//catch any other routes that don't match
app.use(require('./server/routes/catch-all.routes'));

//set server to listen on port
app.listen(port, () => console.log(`listening on port ${port}`));