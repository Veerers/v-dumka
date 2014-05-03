	/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    if (req.query.countOnly) {
        req.db.books.count(function (err, count) {
            res.json({count: count});
        });
    } else {
        req.db.books.find(function (err, results) {
            res.json(results);
        });
    }
});

module.exports = router;
