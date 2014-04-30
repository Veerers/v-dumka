/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var cache = require('services/cache');
    var ko = require('knockout');
    var Search = require('services/search');

    var searchConfig = {
        title: 4,
        author: 4,
        year: 2,
        publisher: 1,
        tags: 3
    };

    var books = cache.books.data;
    var index = ko.computed(function () {
        return new Search(searchConfig, books());
    });
    var search = ko.observable();
    var booksFiltered = ko.computed(function () {
        return index().search(search());
    });

    return {
        activate: function () {
            search('');
            cache.books.update();
        },

        search: search,
        booksFiltered: booksFiltered
    };
});
