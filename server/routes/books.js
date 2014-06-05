/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();
var Cachestamp = require('mongoose').model('Cachestamp');
var Book = require('mongoose').model('Book');

router.get('/', function (req, res, next) {
    if (req.query.from || req.query.count) {
        res.header('Cache-Control', 'no-cache');
        Book.find()
            .skip(req.query.from || 0)
            .limit(req.query.count)
            .exec(function (err, results) {
                if (err) {
                    return next(err);
                }
                res.json(results);
            });
    } else {
        var oldEtag = req.headers['if-none-match'];
        Cachestamp.findOne({
            collectionName: 'books'
        }, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result.timestamp === oldEtag) {
                res.send(304);
            } else {
                Book.find(function (err, results) {
                    if (err) {
                        return next(err);
                    }
                    res.header('Etag', result.timestamp);
                    res.json(results);
                });
            }
        });
    }
});

module.exports = router;
