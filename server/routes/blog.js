/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();
var async = require('async');

router.get('/', function (req, res) {
    if (req.query.from || req.query.count) {
        async.series({
            count: function(callback){
                req.db.articles
                    .count({}, function (err, count){
                        callback(err, count);
                    })
            },
            data: function(callback){
                req.db.articles
                    .find()
                    .skip(req.query.from)
                    .limit(req.query.count)
                    .exec(function (err, results) {
                        callback(err, results);
                    });
            }}, function (err, results){
                res.json({totalCount: results.count, data: results.data});
            });
    } else {
        req.db.articles.find(function (err, results) {
            res.json(results);
        });
    }
});

router.get('/:id', function (req, res) {
    req.db.articles.findOne({
        title: req.params.id
    }, function (err, results) {
        res.json(results);
    });
});

module.exports = router;
