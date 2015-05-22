define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MainView.html'
], function($, _, Backbone,template) {

	var MainView = Backbone.View.extend({

		template:template,

		initialize:function(){
			var _this = this;
			this.$el.html(_this.template);

		}
	});

    return MainView;
});