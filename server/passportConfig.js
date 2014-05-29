'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config.json');
var request = require('request');

passport.serializeUser(function (user, done) {
    done(null, true);
});

passport.deserializeUser(function (isUser, done) {
    done(null, isUser);
});

passport.use(new GitHubStrategy(config.gh, function (accessToken, refreshToken, profile, done) {
    request({
        url: 'https://api.github.com/orgs/Veerers/members/' + profile.username + '?access_token=' + accessToken,
        headers: {
            'User-Agent': 'Veerers'
        }
    }, function (err, res) {
        if (!err && res.statusCode >= 200 && res.statusCode < 400) {
            return done(null, true);
        }
        return done('Not Admin');
    });
}));

module.exports = function (app) {
    app.use(require('cookie-parser')(process.env.VDUMKA_SECRET || config.sessionSecret || 'test'));
    app.use(require('express-session')());
    app.use(passport.initialize());
    app.use(passport.session());
};
