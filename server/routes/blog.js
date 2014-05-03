	/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    req.db.books.find(function(err, results){
        res.json(results);
    });
});

module.exports = router;
