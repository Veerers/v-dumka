/*jslint nomen: true, vars: true, unparam: true*/
/*global define*/
define(function (require) {
    'use strict';

    var cache = require('services/cache');
    var ko = require('knockout');
    var Search = require('services/search');
    var $ = require('jquery');
    var _ = require('lodash');

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
    var isEbook = ko.observable(false);
    var isAvailableOnly = ko.observable(false);
    var search = ko.observable();
    var booksFiltered = ko.computed(function () {
        return _.filter(index().search(search()), function (item, index, collection) {
            if (isEbook()) {
                return item.ebook;
            }
            if (isAvailableOnly()) {
                return !item.ebook && item.available;
            }
            return !item.ebook;
        });
    }).extend({
        rateLimit: 100
    });

    var perPage = 10;
    var currentPage = ko.observable(1);
    search.subscribe(function () {
        currentPage(1);
    });
    var totalPages = ko.computed(function () {
        return Math.ceil(booksFiltered().length / perPage);
    });
    var itemsOnPage = ko.computed(function () {
        return booksFiltered().slice(currentPage() * perPage - perPage, currentPage() * perPage);
    });

    return {
        activate: function () {
            cache.books.update();
        },
        binding: function (view) {
            $(view).find('.book-type-switch > li, .filters > li')
                .tooltip();
            $(view).find('.search-input')
                .keydown(function (e) {
                    if (e.which === 27) {
                        search('');
                    }
                });
        },

        search: search,
        books: itemsOnPage,
        showAdditional: function (data, e) {
            $(e.target).closest('.book-row').toggleClass('expanded');
        },
        searchBy: function (text) {
            search(text.toString());
        },
        paging: {
            current: currentPage,
            last: totalPages,
            goTo: function (page) {
                currentPage(+page);
            },
            next: function () {
                if (currentPage() < totalPages()) {
                    currentPage(currentPage() + 1);
                }
            },
            prev: function () {
                if (currentPage() > 1) {
                    currentPage(currentPage() - 1);
                }
            }
        },
        isEbook: isEbook,
        isAvailableOnly: isAvailableOnly
    };
});
