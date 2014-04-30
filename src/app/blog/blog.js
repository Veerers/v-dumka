/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');
    var BlogGrid = require('./blogGrid');

    var Article = (function(){
        var Class = function(id, header, date, description){
            var that = this;
            that.id = id;
            that.header = header;
            that.date = date;
            that.description = description;
        }
        
        return Class;
    }());

    var articles = [
        new Article(13, "Header", "13.04", "asdg"),
        new Article(12, "Header", "13.04", "asdg"),
        new Article(14, "Header", "13.04", "asdg"),
        new Article(15, "Header", "13.04", "asdg"),
        new Article(16, "Header", "13.04", "asdg"),
        new Article(17, "Header", "13.04", "asdg")
    ];

    var blogGrid = new BlogGrid({
        data: articles,
        pageSize: 4
    })

    return {
        items: articles,
        blogGrid: blogGrid
    };
});