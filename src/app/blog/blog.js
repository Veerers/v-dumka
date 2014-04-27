/*jslint nomen: true, vars: true*/
/*global define*/
define(function (require) {
    'use strict';

    var ko = require('knockout');

    function Article(date, description){
    	var self = this;
    	self.date = date;
    	self.description = description;
    }

    function ArticlesViewModel(){
    	var self = this;

    	self.articles = ko.observableArray([
    			new Article("13.04", "Ko ko ko"),
    			new Article("14.04", "Ko ko ko")
    		]);
    }

    ko.applyBindings(new ArticlesViewModel());	


    return {};
});