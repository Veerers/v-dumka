/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser());
app.use(express.static(__dirname + '/../src'));

app.use('/api/books', require('./routes/books'));

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});
