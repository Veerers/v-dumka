/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');
    var BlogGrid = (function(){

        var BlogGrid = function(config){
        var that = this;

        that.data = config.data;
        that.currentPageIndex = ko.observable(0);
        that.pageSize = config.pageSize || 5;

        that.itemsOnCurrentPage = ko.computed(function() {
            var startIndex = that.pageSize * that.currentPageIndex();
            return that.data.slice(startIndex, startIndex + that.pageSize);
        }, that);
    }

    return BlogGrid;

    }());

    var Article = (function(){
        var Class = function(data){
            var that = this;
            that._id = data.title;
            that.date = data.date;
        }
        
        return Class;
    }());

    var articles = [
        new Article({"title":"13","data" : "13.04"}),
        new Article({"title":"12","data" : "13.04"}),
        new Article({"title":"14","data" : "13.04"}),
        new Article({"title":"15","data" : "13.04"}),
        new Article({"title":"16","data" : "13.04"}),
        new Article({"title":"17","data" : "13.04"})
    ];

    var blogGrid = new BlogGrid({
        data: articles,
        pageSize: 4
    })


    return {
        blogGrid: blogGrid
    };
});