/*jslint browser:true, nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var q = require('q');
    var $ = require('jquery');

    function cached(options, immediateCallback) {
        if (immediateCallback) {
            setTimeout(function () {
                immediateCallback(JSON.parse(localStorage.getItem('__cached_' + options.url)));
            }, 0);
        }
        options.beforeSend = function (xhr) {
            var oldEtag = localStorage.getItem('__etag_' + options.url);
            if (oldEtag) {
                xhr.setRequestHeader('If-None-Match', oldEtag);
            }
        };
        return q($.ajax(options).then(function (body, status, xhr) {
            if (xhr.status === 304) {
                return JSON.parse(localStorage.getItem('__cached_' + options.url));
            }
            if (xhr.getResponseHeader('Cache-Control') !== 'no-cache') {
                setTimeout(function () {
                    localStorage.setItem('__cached_' + options.url, JSON.stringify(body));
                    var etag = xhr.getResponseHeader('Etag');
                    if (etag) {
                        localStorage.setItem('__etag_' + options.url, etag);
                    }
                }, 0);
            }
            return body;
        }));
    }

    return {
        books: {
            get: function (data, immediateCallback) {
                return cached({
                    type: 'GET',
                    url: 'api/books',
                    dataType: 'json',
                    data: data
                }, immediateCallback);
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
