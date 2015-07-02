define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'views/regionView',
    'text!templates/RegionView.html',
    'views/appView',
    'views/outroView'
], function ($, _, Backbone, MathBeast, RegionView, template, appView, outroView) {

    var RegionView = Backbone.View.extend({

        el: $("#mathBeast-container"),

        template: template,

        initialize: function (completed) {
            var _this = this;
            this.$el.html(_this.template);
            this.$el.find('#region').addClass(completed);
            switch (completed) {
            case 'none':
                this.$el.find('#region').find('img:nth-of-type(1)').on('click', function () {
                    new appView('+',RegionView);
                });
                break;
            case 'one':
                this.$el.find('#region').find('img:nth-of-type(2)').on('click', function () {
                    new appView('-',RegionView);
                });
                break;
            case 'two':
                this.$el.find('#region').find('img:nth-of-type(3)').on('click', function () {
                    new appView('*',RegionView);
                });
                break;
            case 'three':
                this.$el.find('#region').find('img:nth-of-type(4)').on('click', function () {
                    new appView('/',RegionView);
                });
                break;
            case 'four':
                new outroView();
                break;
            }
        }
    });

    return RegionView;
});