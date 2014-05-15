/*jslint node:true*/
var Schema = require('mongoose').Schema;

module.exports.book = new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: [String]
});

module.exports.article = new Schema({
    title: String,
    date: String,
    text: String,
    tags: [String]
});

module.exports.cachestamps = new Schema({
    collectionName: String,
    timestamp: Date
});
