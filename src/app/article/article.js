/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';
    var server = require('services/server');
    var ko = require('knockout');

    var article = ko.observable();
    return {
        activate: function(){
            return server.articles.getArticleByTitle(arguments[0])
                .then(function (newData) {
                    article(newData);
                });
        },
        article: article
    };
});