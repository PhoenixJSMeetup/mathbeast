define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'text!templates/MainView.html'
], function($, _, Backbone,MathBeast,template) {

    var MainView = Backbone.View.extend({

        template:template,

        initialize: function() {
            var _this = this;
            this.$el.html(_this.template);

        },
        checkAndContinue: function(value) {

            // Once an attempt is made, a result object is returned.
            // This object contains information about the
            // correctness of the answer choice.
            var result = MathBeast.attempt(value);

            // Calling the answerQuestion event will clear the timer
            this.$el.trigger("answerQuestion", result.rightAnswer);

            if (result.nextQuestion) {

                var question = result.nextQuestion;

                // Update question number
                $('#question--number').text(MathBeast.currentQuestion + 1);

                // Fill in question and answer values on markup
                $('#question--operand-1').text(question.operand1);
                $('#question--operation').text(question.operation);
                $('#question--operand-2').text(question.operand2);
                $('#answers--option-1').text(question.answerOptions[0]);
                $('#answers--option-2').text(question.answerOptions[1]);
                $('#answers--option-3').text(question.answerOptions[2]);

            } else {

                this.$el.trigger("endStage");
                var attempts = MathBeast.attempts;
                var totalQuestions = MathBeast.settings.totalQuestions;

                // Disable multiple choices
                $('#answers--option-1').attr('disabled', 'disabled');
                $('#answers--option-2').attr('disabled', 'disabled');
                $('#answers--option-3').attr('disabled', 'disabled');

                $('main .results').text('Game Over! You answered ' + totalQuestions +
                    ' question(s) in ' + attempts + ' attempts.');
                $('main .message').text('Click Start to play again.');
                $('main .status').fadeIn();

            }
        },
        clickOnAnswer: function(e) {
            this.checkAndContinue($(e.target).html());
        },
        events: {
            'click .answer-option': 'clickOnAnswer',
            'checkAndContinue': 'checkAndContinue'
        }
    });

    return MainView;
});