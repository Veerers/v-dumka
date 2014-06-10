/*jslint node:true*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Book', new Schema({
    title: String,
    author: String,
    year: Number,
    publisher: String,
    review: String,
    tags: {type: [String], index: true }
}), 'books');

mongoose.model('Article', new Schema({
    title: { type: String, index: true },
    date: { type: Date, index: true },
    text: String,
    description: String,
    tags: { type: [String], index: true }
}), 'articles');

mongoose.model('Cachestamp', new Schema({
    collectionName: String,
    timestamp: String
}), 'cachestamps');
