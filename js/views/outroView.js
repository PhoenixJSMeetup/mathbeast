define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'views/outroView',
    'text!templates/outroView.html'
], function ($, _, Backbone, MathBeast, OutroView, template) {

    var OutroView = Backbone.View.extend({

        el: $("#mathBeast-container"),

        template: template,

        initialize: function () {
            var _this = this;
            this.$el.html(_this.template);
            this.playAnimation();
        },
        playAnimation: function(){
            var _this = this;
            setTimeout(function () {
                _this.$el.find('#outro').addClass('explosion');
                setTimeout(function () {
                    _this.$el.find('#outro').addClass('play');
                    setTimeout(function () {
                        _this.$el.find('#outro').addClass('welcome');
                    }, 3000);
                }, 1000);
            }, 500);   
        }
    });

    return OutroView;
});