/*jslint node:true*/
var Schema = require('mongoose').Schema;

module.exports.books = new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: [String]
});

module.exports.cachestamps = new Schema({
    collectionName: String,
    timestamp: Number
});
