/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var isProduction = process.env.NODE_ENV === 'production';

var mongoose = require('mongoose').connect(process.env.VDUMKA_MONGO_CONNECTION_STRING);
var models = require('./models');
var books = mongoose.model('books', models.books);
var blog = mongoose.model('blog', models.blog);

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(require('body-parser')());
app.use(express.static(__dirname + (isProduction ? '/../public' : '/../src')));
app.use(function (req, res, next) {
    req.db = {
        books: books,
        blog: blog
    };
    next();
});

app.use('/api/books', require('./routes/books'));
app.use('/api/blog', require('./routes/blog'));

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});
