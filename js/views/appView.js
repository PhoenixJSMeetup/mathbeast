define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'views/appView',
    'views/settingView',
    'views/mainView',
    'text!templates/AppView.html'
], function($, _, Backbone,MathBeast,AppView,SettingView,MainView,template) {

    var AppView = Backbone.View.extend({

        el:$("#mathBeast-container"),

        template:template,

        initialize: function(operation, RegionView) {
            var _this = this;
            this.$el.html(_this.template);
            this.operation = operation;
            this.regionView = RegionView;

            this.renderMainView();
        },

        renderMainView: function() {
            var myMainView = new MainView({
                el:$("#mainContainer")
            });
            this.startGame();
        },

        startGame: function() {
            var upperLimit = 12;
            var operation = this.operation;
            var totalQuestions = 4;

            // Initialize game
            MathBeast.start(parseInt(upperLimit), operation, parseInt(totalQuestions));

            // Get first question
            var question = MathBeast.getCurrentQuestion();

            // Question Number
            $('#question--number').text(1);

            // Fill in question and answer values on markup
            $('#question--operand-1').text(question.operand1);
            $('#question--operation').text(question.operation);
            $('#question--operand-2').text(question.operand2);
            $('#answers--option-1').text(question.answerOptions[0]);
            $('#answers--option-2').text(question.answerOptions[1]);
            $('#answers--option-3').text(question.answerOptions[2]);

            // Enable multiple choice buttons
            $('#answers--option-1').removeAttr('disabled');
            $('#answers--option-2').removeAttr('disabled');
            $('#answers--option-3').removeAttr('disabled');

            $('main .status').fadeOut();
            $('main .question').fadeIn();
            $('main .answers').fadeIn();
            $('main .timer').fadeIn();

            this.countDown.run();
        },

        countDown: {
            run: function() {
                var newTimer = $("<div class='bar'></div>");
                $("#timerContainer").append(newTimer);
                var time = MathBeast.settings.timer;
                $(".bar").animate({
                    "width": "0",
                    "padding": "0"
                }, time, function() {
                    this.remove();
                })
            },

            clear: function() {
                $(".bar").remove();
                return this;
            }
        },

        /**
         *
         * @param event object
         * @param isRightAnswer Boolean
         */
        answerQuestion: function(event, isRightAnswer) {
            // Stop timer
            this.countDown.clear().run()
            // @TODO User boolean argument to determine if question was answered correctly
        },

        endStage: function(event) {
            //logic for determining passing
            RegionView = this.regionView;
            switch(this.operation){
                case '+':
                    new RegionView('one');
                    break;
                case '-':
                    new RegionView('two');
                    break;
                case '*':
                    new RegionView('three');
                    break;
                case '/':
                    new RegionView('four');
                    break;
            }

        },

        events: {
            answerQuestion: 'answerQuestion',
            endStage: 'endStage'
        }
    });

    return AppView;
});