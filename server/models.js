/*jslint node:true*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Book', new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: [String]
}), 'books');

mongoose.model('Article', new Schema({
    title: String,
    date: String,
    text: String,
    tags: [String]
}), 'articles');

mongoose.model('Cachestamp', new Schema({
    collectionName: String,
    timestamp: Date
}), 'cachestamps');
