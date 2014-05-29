/*jslint nomen: true, vars: true, browser: true, unparam:true*/
/*global define*/
define(function (require) {
    'use strict';
    var router = require('plugins/router');
    var i18n = require('i18next');

    return {
        otherLanguage: i18n.lng() === 'ru' ? i18n.t('by') : i18n.t('ru'),
        changeLanguage: function () {
            i18n.setLng(i18n.lng() === 'ru' ? 'by' : 'ru', function () {
                location.reload();
            });
        },
        router: router,
        activate: function () {
            router.map([{
                route: '(home)',
                title: i18n.t('home'),
                moduleId: 'home/home',
                isMain: true,
                img: undefined
            }, {
                route: 'books',
                title: i18n.t('books'),
                moduleId: 'books/books',
                isMain: false,
                img: 'books'
            }, {
                route: 'blog',
                title: i18n.t('blog'),
                moduleId: 'blog/blog',
                isMain: false,
                img: 'blog'
            }, {
                route: 'blog/:id',
                title: i18n.t('blog'),
                moduleId: 'article/article',
                isMain: false,
                img: 'blog'
            }, {
                route: 'events',
                title: i18n.t('events'),
                moduleId: 'events/events',
                isMain: false,
                img: 'events'
            }]);

            router.guardRoute = function (instance, instuction) {
                if (instuction.queryParams && instuction.queryParams.hasOwnProperty('auth')) {
                    window.open('/api/auth/github/callback', '', 'width=800, height=600');
                    var hash = window.location.hash;
                    window.location.hash = hash.slice(0, hash.indexOf('?'));
                }
                return true;
            };

            return router.activate();
        }
    };
});
