/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();
var passport = require('passport');

router.get('/test', require('../ensureAuth.js'), function (req, res) {
    res.send(200);
});

router.get('/github/callback',
    passport.authenticate('github'),
    function (req, res) {
        res.redirect('/auth.html');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.send(200);
});

module.exports = router;
