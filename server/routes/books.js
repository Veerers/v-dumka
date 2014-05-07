	/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    if (req.query.timestamp) {
        req.db.cachestamps.findOne({collectionName: 'books'}, function (err, result) {
            res.json({
                timestamp: result.timestamp
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
