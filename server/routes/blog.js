/*jslint node:true,unparam:true,nomen:true,vars:true*/
'use strict';

var router = require('express').Router();
var Article = require('mongoose').model('Article');
var async = require('async');

router.get('/', function (req, res, next) {
    if (req.query.from || req.query.count) {
        async.series({
            count: function (callback) {
                Article
                    .count({}, function (err, count) {
                        callback(err, count);
                    });
            },
            data: function (callback) {
                Article
                    .find()
                    .skip(req.query.from)
                    .limit(req.query.count)
                    .exec(function (err, results) {
                        callback(err, results);
                    });
            }
        }, function (err, results) {
            if (err) {
                return next(err);
            }
            res.json({
                totalCount: results.count,
                data: results.data
            });
        });
    } else {
        Article.find(function (err, results) {
            if (err) {
                return next(err);
            }
            res.json(results);
        });
    }
});

router.get('/:title', function (req, res, next) {
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
