/*jslint node:true,unparam:true,nomen:true,vars:true,stupid:true*/
'use strict';

var config = require('./config');
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

require('fs').readdirSync(__dirname + '/routes').forEach(function (route) {
    var fileName = route.substr(0, route.indexOf('.js'));
    app.use('/api/' + fileName, require('./routes/' + fileName));
});

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});
