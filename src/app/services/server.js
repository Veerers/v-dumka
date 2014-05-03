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
        }
    };
});
