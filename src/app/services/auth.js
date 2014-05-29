/*jslint vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');
    var $ = require('jquery');

    var isAuth = ko.observable(false);

    $.ajax({
        type: 'GET',
        url: '/api/auth/is',
        success: function () {
            isAuth(true);
        }
    });

    return {
        isAuth: isAuth
    };
});
