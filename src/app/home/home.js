/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var ko = require('knockout');
    var _ = require('lodash');
    
    var carousel = (function(){
        var current = ko.observable(0);
        var cicle = function(){
            if (current() < 4) {
                current(current() + 1);
            } else {
                current(0);
            }
        }
        var goLeft = function(){
            auto(false);
            if (current() > 0) {
                current(current() - 1);
            } else {
                current(4);
            }
        };
        var goRight = function(){
            auto(false);
            cicle();
        };
        var goTo = function(value){
            auto(false);
            current(value);
        };
        var auto = ko.observable(true);
        (function autoCicle(){
            setTimeout(function(){
                if (auto()){
                    cicle();
                    autoCicle();
                }
            }, 7000);
        }());
        return {
            current: current,
            goLeft: goLeft,
            goRight: goRight,
            goTo: goTo
        }
    }());

    return {
        carousel: carousel
    };
});