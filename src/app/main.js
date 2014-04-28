/*jslint nomen: true, vars: true*/
/*global requirejs, define*/
(function () {
    'use strict';

    requirejs.config({
        paths: {
            'bootstrap': '../libs/bootstrap/dist/js/bootstrap',
            'durandal': '../libs/durandal/js',
            'transitions': '../libs/durandal/js/transitions',
            'plugins': '../libs/durandal/js/plugins',
            'i18next': '../libs/i18next/i18next.amd.withJQuery',
            'jquery': '../libs/jquery/jquery',
            'knockout': '../libs/knockout.js/knockout',
            'lodash': '../libs/lodash/dist/lodash',
            'moment': '../libs/moment/moment',
            'numeral': '../libs/numeral/numeral',
            'q': '../libs/q/q',
            'text': '../libs/requirejs-text/text',

            'server': 'services/server'
        },
        shim: {
            'bootstrap': ['jquery']
        }
    });

    define(function (require) {
        var system = require('durandal/system');
        var app = require('durandal/app');
        var viewLocator = require('durandal/viewLocator');
        var binder = require('durandal/binder');
        var $ = require('jquery');
        var Q = require('q');
        var i18next = require('i18next');

        // init plugins
        require('bootstrap');

        //@ifdef DEV
        system.debug(true);
        //@endif

        //@ifndef DEV
        app.title = 'Вольная Думка';
        //@endif
        //@ifdef DEV
        app.title = 'Dev - Вольная Думка';
        //@endif

        app.configurePlugins({
            router: true
        });

        system.defer = function (action) {
            var deferred = Q.defer();
            action.call(deferred, deferred);
            var promise = deferred.promise;
            deferred.promise = function () {
                return promise;
            };
            return deferred;
        };

        var i18NOptions = {
            useCookie: true,
            preload: ['ru', 'by'],
            fallbackLng: ['ru', 'by'],
            useLocalStorage: true,
            localStorageExpirationTime: 10800000, // 3 hours
            resGetPath: 'locales/__ns__-__lng__.json',
            lowerCaseLng: true
        };

        //@ifdef DEV
        i18NOptions.useLocalStorage = false;
        i18NOptions.debug = true;
        //@endif

        app.start().then(function () {
            i18next.init(i18NOptions, function () {
                /*jslint unparam: true*/
                binder.binding = function (obj, view) {
                    $(view).i18n();
                };
                /*jslint unparam: false*/

                viewLocator.useConvention();
                app.setRoot('shell', 'entrance', 'application');
            });
        });
    });
}());