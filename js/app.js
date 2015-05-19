/*
  This fires up the application.
  It loads the router and calles the initialize method.
*/

define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {


    return {
        initialize: function() {
            alert("app load")
        }
    };
});