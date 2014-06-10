/*jslint node:true,unparam:true,nomen:true,vars:true*/
'use strict';

var router = require('express').Router();
var Article = require('mongoose').model('Article');

router.get('/', function (req, res, next) {
    Article.find(function (err, results) {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
});

router.get('/:title', function (req, res) {
    Article.findOne({
        title: req.params.title
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
});

module.exports = router;
