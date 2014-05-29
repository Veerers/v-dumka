/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var config = require('../config.json');
var isProduction = process.env.NODE_ENV === 'production';

require('mongoose').connect(config.mongo);
require('./models');

var express = require('express');
var app = express();

app.set('port', config.port);

app.use(require('body-parser')());
app.use(require('compression')());
require('./passportConfig')(app);
app.use(express.static(__dirname + (isProduction ? '/../public' : '/../src')));

app.use('/api/books', require('./routes/books'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/auth', require('./routes/auth'));

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});
