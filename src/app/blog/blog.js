/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('services/server');
    var ko = require('knockout');

    var articles = ko.observableArray();

    return {
        activate: function () {
            return server.blog.get()
                .then(function (newData) {
                    articles(newData);
                });
        },
        articles: articles
    };
});
