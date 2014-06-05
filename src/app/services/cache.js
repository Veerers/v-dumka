/*jslint nomen: true, vars: true, browser: true*/
/*global define*/
define(function (require) {
    'use strict';

    var server = require('./server');
    var ko = require('knockout');

    var cached = {
        books: ko.observableArray()
    };

    return {
        books: {
            data: cached.books,
            update: function () {
                return server.books.get({}, function (oldCached) {
                    if (oldCached && oldCached.length) {
                        cached.books(oldCached);
                    } else {
                        server.books.get({from: 0, count: 20})
                            .then(function (newItems) {
                                if (!cached.books().length) {
                                    cached.books(newItems);
                                }
                            });
                    }
                }).then(function (newItems) {
                    cached.books(newItems);
                    return newItems;
                });
            }
        }
    };
});
