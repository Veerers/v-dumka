/*jslint nomen:true,vars:true*/
/*global define*/
define(function (require) {
    'use strict';
    var server = require('services/server');
    var ko = require('knockout');
    var moment = require('moment');

    var history = require('plugins/history');

    var article = ko.observable();
    return {
        activate: function (title) {
            return server.articles.get(title)
                .then(function (newData) {
                    article(newData);
                });
        },
        article: article,
        moment: moment,
        goBack: function () {
            history.navigateBack();
        }
    };
});
