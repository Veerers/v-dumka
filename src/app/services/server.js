/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var q = require('q');
    var $ = require('jquery');

    return {
        books: {
            get: function () {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/books',
                    dataType: 'json'
                }));
            },
            count: function () {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/books?countOnly=true',
                    dataType: 'json'
                }));
            }
        },
        blog: {
            get: function () {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/blog',
                    dataType: 'json'
                }));
            },
            getArticleByTitle: function(title){
                return q($.ajax({
                    type: 'GET',
                    url: 'api/blog/' + title,
                    dataType: 'json'
                }));
            }
        }
    };
});
