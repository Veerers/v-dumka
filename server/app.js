/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var config = require('./config');

var mongoose = require('mongoose').connect(config.mongodbConnectionString);
var models = require('./models');
var books = mongoose.model('books', models.books);

var express = require('express');
var app = express();

app.set('port', process.env.PORT || config.defaultPort);

app.use(require('body-parser')());
app.use(express.static(__dirname + '/../src'));
app.use(function (req, res, next) {
    req.db = {
        books: books
    };
    next();
});

app.use('/api/books', require('./routes/books'));

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});
