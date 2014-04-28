/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('server');
    var ko = require('knockout');
    var _ = require('lodash');
    var Search = require('services/search');

    var index;
    var searchConfig = {
        title: 2,
        author: 2,
        year: 2,
        publisher: 1,
        tags: 3
    };

    var books = ko.observableArray();
    var search = ko.observable();
    var booksFiltered = ko.computed(function () {
        if (_.isEmpty(search())) {
            return books();
        }
        return index.search(search());
    });

    return {
        activate: function () {
            search('');
            if (!_.isEmpty(books())) {
                //TODO use cache module
                return;
            }
            return server.books.get()
                .then(function (data) {
                    books(data);
                    index = new Search(searchConfig, books());
                });
        },

        search: search,
        booksFiltered: booksFiltered
    };
});
