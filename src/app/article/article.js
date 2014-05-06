/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';
    var server = require('services/server');
    var ko = require('knockout');

    var article = ko.observable();
    var title = document.URL.substr(document.URL.lastIndexOf("/") + 1);
    return {
        activate: function(){
            return server.blog.getArticleByTitle(title)
                .then(function (newData) {
                    article(newData);
                });
        },
        article: article
    };
});