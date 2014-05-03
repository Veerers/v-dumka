/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    if (req.query.countOnly) {
        req.db.books.count(function (err, count) {
            res.json({
                count: count
            });
        });
    } else if (req.query.from || req.query.count) {
        req.db.books
            .find()
            .skip(req.query.from || 0)
            .limit(req.query.count)
            .exec(function (err, results) {
                res.json(results);
            });
    } else {
        req.db.books.find(function (err, results) {
            res.json(results);
        });
    }
});

module.exports = router;
