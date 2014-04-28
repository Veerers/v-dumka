/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var q = require('q');
    var $ = require('jquery');

    return {
        books: {
            get: function (id) {
                return q($.ajax({
                    type: 'GET',
                    url: 'api/books/' + (id === undefined ? '' : id),
                    dataType: 'json'
                }));
            }
        }
    };
});
