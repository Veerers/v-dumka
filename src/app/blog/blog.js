/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('services/server');
    var ko = require('knockout');

    var perPage = 5;
    var currentPage = ko.observable(1);
    var totalPages = ko.observable();

    var itemsOnPage = ko.observableArray();

    return {
        activate: function () {
            return server.articles.getPart(0, perPage)
                .then(function (newData) {
                    itemsOnPage(newData.data);
                    totalPages(newData.totalCount / perPage);
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
