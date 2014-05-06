/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    req.db.blog.find(function (err, results) {
        res.json(results);
    });
});

router.get('/:id', function(req, res){
	req.db.blog.findOne({ 'title' :  req.params.id },function (err, results) {
        res.json(results);
    });
})

module.exports = router;
