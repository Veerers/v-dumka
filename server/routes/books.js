/*jslint node: true, unparam: true, nomen: true, vars: true*/
'use strict';

var _ = require('lodash');
var router = require('express').Router();

var collectionStub = [{
    _id: 1,
    title: 'Моя книг',
    author: 'Иван',
    year: 2001,
    publisher: 'Москва',
    review: 'http://smth.com',
    tags: ['Философия', 'Угар']
}, {
    _id: 2,
    title: 'Твоя книга',
    author: 'Петр',
    year: 2003,
    publisher: 'От бога',
    review: null,
    tags: ['Философия', 'Сказки']
}, {
    _id: 3,
    title: 'Хитрая книга',
    author: null,
    year: null,
    publisher: null,
    review: null,
    tags: null
}];

router.get('/', function (req, res) {
    res.json(collectionStub);
});

router.get('/:id', function (req, res) {
    res.json(_.find(collectionStub, function (item) {
        return item._id === (+req.params.id);
    }));
});

module.exports = router;
