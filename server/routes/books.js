/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();
var Cachestamp = require('mongoose').model('Cachestamp');
var Book = require('mongoose').model('Book');

router.get('/', function (req, res) {
    if (req.query.timestamp) {
        Cachestamp.findOne({
            collectionName: 'books'
        }, function (err, result) {
            res.json({
                timestamp: result.timestamp
            });
        });
    } else if (req.query.from || req.query.count) {
        Book.find()
            .skip(req.query.from || 0)
            .limit(req.query.count)
            .exec(function (err, results) {
                res.json(results);
            });
    } else {
        Book.find(function (err, results) {
            res.json(results);
        });
    }
});

module.exports = router;
