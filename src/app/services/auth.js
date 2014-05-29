/*jslint vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');
    var $ = require('jquery');

    var isAuth = ko.observable(false);

    $.get('/api/auth/is', isAuth.bind(null, true));

    return {
        isAuth: isAuth
    };
});
