define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'views/introductionView',
    'text!templates/introductionView.html'
], function ($, _, Backbone, MathBeast, IntroductionView, template) {

    var IntroductionView = Backbone.View.extend({

        el: $("#mathBeast-container"),

        template: template,

        initialize: function () {
            var _this = this;
            this.$el.html(_this.template);
            setTimeout(function () {
                _this.$el.find('#introduction').addClass('play');
                setTimeout(function () {
                    _this.$el.find('#introduction').addClass('explosion');
                    setTimeout(function () {
                        _this.$el.find('#introduction').addClass('welcome');
                    }, 1000);
                }, 3000);
            }, 500);
        }
    });

    return IntroductionView;
});