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

                function sync() {
                    server.books.timestamp()
                        .then(function (timestampData) {
                            if (timestampData.timestamp.toString() !== localStorage.getItem('booksTimestamp')) {
                                updateFromServer();
                                localStorage.setItem('booksTimestamp', timestampData.timestamp.toString());
                            }
                        });
                }

                if (!cached.books().length) {
                    cached.books(JSON.parse(localStorage.getItem('books')) || []);
                }
                if (!force && cached.books().length) {
                    sync();
                } else {
                    server.books.getPart(0, 20)
                        .then(cached.books)
                        .then(sync);
                }

            }
        }
    };
});
