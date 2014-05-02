var Schema = require('mongoose').Schema;

module.exports.books = new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: [String]
});