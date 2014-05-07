/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';
    var server = require('services/server');
    var ko = require('knockout');

    var article = ko.observable();
    return {
        activate: function(title){
            return server.articles.getArticleByTitle(title)
                .then(function (newData) {
                    article(newData);
                });
        },
        article: article
    };
});
