/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var config = require('../config.json');
var isProduction = process.env.NODE_ENV === 'production';

require('mongoose').connect(process.env.VDUMKA_MONGO_CONNECTION_STRING || config.mongo);
require('./models');

var express = require('express');
var app = express();

app.set('port', process.env.VDUMKA_PORT || process.env.PORT || config.port || 3000);

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
