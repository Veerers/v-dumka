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
            update: function (force) {
                function updateFromServer() {
                    server.books.get()
                        .then(function (newData) {
                            cached.books(newData);
                            setTimeout(function () {
                                localStorage.setItem('books', JSON.stringify(newData));
                            }, 0);
                            return newData;
                        });
                }
                if (!cached.books().length) {
                    cached.books(JSON.parse(localStorage.getItem('books')) || []);
                }
                if (!force && cached.books().length) {
                    setTimeout(function () {
                        server.books.count()
                            .then(function (countData) {
                                if (countData.count !== cached.books().length) {
                                    updateFromServer();
                                }
                            });
                    }, 0);
                } else {
                    server.books.getPart(0, 20)
                        .then(function (newData) {
                            cached.books(newData);
                        })
                        .then(updateFromServer);
                }

            }
        }
    };
});
