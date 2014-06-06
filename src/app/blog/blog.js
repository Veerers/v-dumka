/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('services/server');
    var ko = require('knockout');
    var moment = require('moment');

    var perPage = 5;
    var currentPage = ko.observable(1);
    var countOfArticles = ko.observable();
    var totalPages = ko.computed(function(){
        return Math.ceil(countOfArticles() / perPage);
    });
    var itemsOnPage = ko.observableArray();

    var updatePage = function(){
        return server.articles.getPart((currentPage() - 1) * perPage, perPage)
                .then(function (newData) {
                    itemsOnPage(newData.data);
                    countOfArticles(newData.totalCount);
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
        },
        moment: moment
    };
});
