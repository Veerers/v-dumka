var Schema = require('mongoose').Schema;

module.exports.books = new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: [String]
});

module.exports.blog = new Schema({
    title: String,
    date: String,
    text: String,
    tags: [String]
});