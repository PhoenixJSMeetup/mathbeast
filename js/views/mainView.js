define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'text!templates/MainView.html',
    'react',
    'reactdom',
], function($, _, Backbone,MathBeast,template, React, ReactDOM) {

  var Hello = React.createFactory(React.createClass({
    render: function() {
      return React.createElement('div', null, 'Hello world!');
    }
  }));


    var MainView = Backbone.View.extend({
        initialize: function() {
          console.log('el:', this.el, '$el:', this.$el);
          ReactDOM.render(React.createElement(Hello), this.el);
        },
        //checkAndContinue: function(e) {

            //// Once an attempt is made, a result object is returned.
            //// This object contains information about the
            //// correctness of the answer choice.
            //var result = MathBeast.attempt($(e.target).html());

            //// Calling the answerQuestion event will clear the timer
            //this.$el.trigger("answerQuestion", result.rightAnswer);

            //if (result.nextQuestion) {

                //var question = result.nextQuestion;

                //// Update question number
                //$('#question--number').text(MathBeast.currentQuestion + 1);

                //// Fill in question and answer values on markup
                //$('#question--operand-1').text(question.operand1);
                //$('#question--operation').text(question.operation);
                //$('#question--operand-2').text(question.operand2);
                //$('#answers--option-1').text(question.answerOptions[0]);
                //$('#answers--option-2').text(question.answerOptions[1]);
                //$('#answers--option-3').text(question.answerOptions[2]);

            //} else {

                //this.$el.trigger("endStage");
                //var attempts = MathBeast.attempts;
                //var totalQuestions = MathBeast.settings.totalQuestions;

                //// Disable multiple choices
                //$('#answers--option-1').attr('disabled', 'disabled');
                //$('#answers--option-2').attr('disabled', 'disabled');
                //$('#answers--option-3').attr('disabled', 'disabled');

                //$('main .results').text('Game Over! You answered ' + totalQuestions +
                    //' question(s) in ' + attempts + ' attempts.');
                //$('main .message').text('Click Start to play again.');
                //$('main .status').fadeIn();

            //}
        //},
        //events: {
            //'click .answer-option':'checkAndContinue'
        //}
    });

    return MainView;
});
