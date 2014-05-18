/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('services/server');
    var ko = require('knockout');

    var articles = ko.observableArray();

    var perPage = 5;
    var currentPage = ko.observable(1);
    var totalPages = ko.computed(function(){
        return Math.ceil(articles().length / perPage);
    });

    var itemsOnPage = ko.computed(function () {
        return articles().slice(currentPage() * perPage - perPage, currentPage() * perPage);
    });

    return {
        activate: function () {
            return server.articles.get()
                .then(function (newData) {
                    articles(newData);
                });
        },
        articles: itemsOnPage,
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
        }
    };
});
