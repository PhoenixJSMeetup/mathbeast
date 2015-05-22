define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SettingView.html'
], function($, _, Backbone,template) {

	var SettingView = Backbone.View.extend({

		template:template,

		initialize:function(){
			var _this = this;
			this.$el.html(_this.template);

		},
		loadMainView:function(){
			$("body").trigger("startGame")
		},
		events:{
			'click .settings-save':'loadMainView'
		}
	});

    return SettingView;
});