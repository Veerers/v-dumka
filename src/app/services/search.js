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
            var that = this;
            var reg = /[а-яА-Я’\d\w]+/gi;
            var normalizer = function (string) {
                return string
                    .replace('ё', 'е')
                    .replace('й', 'и')
                    .replace('і', 'и')
                    .replace('ў', 'у')
                    .replace('Ё', 'Е')
                    .replace('Й', 'И')
                    .replace('І', 'И')
                    .replace('Ў', 'У');
            };
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
                                    if (normalizer(subItem.toString()).toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                                        points += value;
                                    }
                                });
                                return;
                            }
                            if (normalizer(item[key].toString()).toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                                points += value;
                            }
                        });
                    });
                    return {
                        points: points,
                        item: item
                    };
                })
                .filter(function (item) {
                    return item.points > 0;
                })
                .sortBy(function (item) {
                    return -item.points;
                })
                .map(function (item) {
                    return item.item;
                })
                .valueOf();
        };

        return Class;
    }());

    return Search;
});
