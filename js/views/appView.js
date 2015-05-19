define([
    'jquery',
    'underscore',
    'backbone',
    'views/appView',
    'text!templates/AppView.html'
], function($, _, Backbone,appView,template) {

	var AppView = Backbone.View.extend({

		el:$("#mathBeast-container"),

		template:template,

		initialize:function(){
			var _this = this;
			this.$el.html(_this.template)
		}
	});

    return AppView;
});