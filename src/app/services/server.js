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
            timestamp: function () {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/books?timestamp=true',
                    dataType: 'json'
                }));
            },
            getPart: function (from, count) {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/books',
                    dataType: 'json',
                    data: {
                        from: from,
                        count: count
                    }
                }));
            }
        },
        articles: {
            get: function (title) {
                if (title === undefined) {
                    return q($.ajax({
                        type: 'GET',
                        url: 'api/blog',
                        dataType: 'json'
                    }));
                }
                return q($.ajax({
                    type: 'GET',
                    url: 'api/blog/' + title,
                    dataType: 'json'
                }));
            }
        }
    };
});
