/*jslint nomen: true, vars: true, unparam: true*/
/*global define*/
define(function (require) {
    'use strict';

    var cache = require('services/cache');
    var ko = require('knockout');
    var Search = require('services/search');
    var $ = require('jquery');

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
        return index().search(search()).slice(0, 20);
    }).extend({rateLimit: 500});

    return {
        activate: function () {
            // search('');
            cache.books.update();
        },
        binding: function(view){
            $('.search-input')
                .keydown(function(e){
                    if (e.which === 27) {
                        search('');
                    }
                });
        },

        search: search,
        booksFiltered: booksFiltered,
        showAdditional: function (data, e) {
            $(e.target).closest('.book-row').toggleClass('expanded');
        },
        searchBy: function(text){
            search('' + text);
        }
    };
});
