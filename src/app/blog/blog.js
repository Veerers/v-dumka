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

    var updatePage = function(){
        return server.articles.getPart((currentPage() - 1) * perPage, perPage)
                .then(function (newData) {
                    itemsOnPage(newData.data);
                    totalPages(newData.totalCount / perPage);
                });
    }

    return {
        activate: function () {
            return updatePage();
        },
        articles: itemsOnPage,
        paging: {
            current: currentPage,
            last: totalPages,
            goTo: function (page) {
                currentPage(+page);
                updatePage();
            },
            next: function () {
                if (currentPage() < totalPages()) {
                    currentPage(currentPage() + 1);
                    updatePage();
                }
            },
            prev: function () {
                if (currentPage() > 1) {
                    currentPage(currentPage() - 1);
                    updatePage();
                }
            }
        }
    };
});
