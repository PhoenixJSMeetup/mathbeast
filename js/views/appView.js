define([
    'jquery',
    'underscore',
    'backbone',
    'views/appView',
    'views/settingView',
    'views/mainView',
    'text!templates/AppView.html'
], function($, _, Backbone,AppView,SettingView,MainView,template) {

	var AppView = Backbone.View.extend({

		el:$("#mathBeast-container"),

		template:template,

		initialize:function(){
			var _this = this;
			this.$el.html(_this.template);
			this.renderSettingView();
			this.renderMainView();
			$("body").on("startGame",function(event,data){
				_this.renderMainView()
			})
		},
		renderSettingView:function(){
			var mySettingView = new SettingView({
				el:$(".setting")
			})
		},
		renderMainView:function(){
			var myMainView = new MainView({
				el:$("#mainContainer")
			})
		}
	});

    return AppView;
});