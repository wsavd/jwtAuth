// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');
const mongoose = require('mongoose');
const path = require('path');

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jwt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// use morgan to log requests to the console
app.use(morgan('dev'));

var index = require('./routes/router');
app.use('/', index);

// Server Setup
const port = process.env.PORT || 3098;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
