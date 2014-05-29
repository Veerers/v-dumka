/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();
var Article = require('mongoose').model('Article');

router.get('/', function (req, res) {
    Article.find(function (err, results) {
        res.json(results);
    });
});

router.get('/:id', function (req, res) {
    Article.findOne({
        title: req.params.id
    }, function (err, results) {
        res.json(results);
    });
});

module.exports = router;
