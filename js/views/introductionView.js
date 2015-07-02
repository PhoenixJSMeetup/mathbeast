define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'views/introductionView',
    'text!templates/IntroductionView.html',
    'views/regionView'
], function ($, _, Backbone, MathBeast, IntroductionView, template, regionView) {

    var IntroductionView = Backbone.View.extend({

        el: $("#mathBeast-container"),

        template: template,

        initialize: function () {
            var _this = this;
            this.$el.html(_this.template);
            this.playAnimation();
            this.$el.find('#introduction > .begin > button').on('click',function(){
                new regionView('none');
            });
        },
        playAnimation: function(){
            var _this = this;
            setTimeout(function () {
                _this.$el.find('#introduction').addClass('play');
                setTimeout(function () {
                    _this.$el.find('#introduction').addClass('explosion');
                    setTimeout(function () {
                        _this.$el.find('#introduction').addClass('welcome');
                        setTimeout(function () {
                            _this.$el.find('#introduction').addClass('begin');
                        }, 15000);
                    }, 1000);
                }, 3000);
            }, 500);   
        }
    });

    return IntroductionView;
});