/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var _ = require('lodash');

    var Search = (function () {
        function Class(config, data) {
            this.config = config;
            this.data = data;
        }

        Class.prototype.search = function (text) {
            function normalizer(string) {
                return string
                    .replace('ё', 'е')
                    .replace('й', 'и')
                    .replace('і', 'и')
                    .replace('ў', 'у')
                    .replace('Ё', 'Е')
                    .replace('Й', 'И')
                    .replace('І', 'И')
                    .replace('Ў', 'У');
            }
            function contains(base, string) {
                return normalizer(base.toString()).toLowerCase().indexOf(normalizer(string.toString()).toLowerCase()) !== -1;
            }
            if (_.isEmpty(text)) {
                return this.data;
            }
            var that = this;
            var reg = /[а-яА-Я’\d\w]+/gi;
            var words = normalizer(text).match(reg);
            return _(this.data)
                .map(function (item) {
                    var points = 0;
                    _.forEach(that.config, function (value, key) {
                        if (item[key] === undefined || item[key] === null) {
                            return;
                        }
                        _.forEach(words, function (word) {
                            if (_.isArray(item[key])) {
                                _.forEach(item[key], function (subItem) {
                                    if (contains(subItem, word)) {
                                        points += value;
                                    }
                                });
                                return;
                            }
                            if (contains(item[key], word)) {
                                points += value;
                            }
                        });
                    });
                    return {
                        points: points,
                        value: item
                    };
                })
                .filter('points')
                .sortBy(function (item) {
                    return -item.points;
                })
                .map('value')
                .valueOf();
        };

        return Class;
    }());

    return Search;
});
