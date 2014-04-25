/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';
    var ko = require('knockout');

    var carousel = (function () {
        var auto = true;
        var delay = 7000;
        var slides = 5;
        var current = ko.observable(0);
        var cicle = function () {
            if (current() < slides - 1) {
                current(current() + 1);
            } else {
                current(0);
            }
        };
        var goLeft = function () {
            auto = false;
            if (current() > 0) {
                current(current() - 1);
            } else {
                current(slides - 1);
            }
        };
        var goRight = function () {
            auto = false;
            cicle();
        };
        var goTo = function (value) {
            auto = false;
            current(value);
        };
        (function autoCicle() {
            setTimeout(function () {
                if (auto) {
                    cicle();
                    autoCicle();
                }
            }, delay);
        }());
        return {
            current: current,
            goLeft: goLeft,
            goRight: goRight,
            goTo: goTo
        };
    }());

    return {
        carousel: carousel
    };
});