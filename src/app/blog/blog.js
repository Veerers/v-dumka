/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');
    var server = require('server');

    var BlogGrid = (function () {

        var Class = function (config) {
            var that = this;

            that.data = config.data;
            that.currentPageIndex = ko.observable(0);
            that.pageSize = config.pageSize || 5;

            that.itemsOnCurrentPage = ko.computed(function () {
                var startIndex = that.pageSize * that.currentPageIndex();
                return that.data.slice(startIndex, startIndex + that.pageSize);
            }, that);
        };

        return Class;
    }());

    var articles = ko.observableArray();

    var blogGrid = ko.computed(function () {
        return new BlogGrid({
            data: articles(),
            pageSize: 2
        });
    });

    return {
        blogGrid: blogGrid,
        activate: function () {
            return server.blog.get()
                .then(function (newData) {
                    articles(newData);
                });
        }
    };
});
