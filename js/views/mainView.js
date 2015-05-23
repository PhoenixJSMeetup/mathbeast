define([
    'jquery',
    'underscore',
    'backbone',
    'MathBeast',
    'text!templates/MainView.html'
], function($, _, Backbone,MathBeast,template) {

	var MainView = Backbone.View.extend({

		template:template,

		initialize:function(){
			var _this = this;
			this.$el.html(_this.template);

		},
		checkAndContinue:function(e){

		    // Get current question
		    var result = MathBeast.attempt($(e.target).html());
		    
		    if (result.rightAnswer) {

		      //reinitialize the timer
		      $("body").trigger("rightAnswer")
		      console.log("Right Answer");
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
		        countDown.clear()
		        var attempts = MathBeast.attempts;
		        var totalQuestions = MathBeast.settings.totalQuestions;

		        console.log("Game Over!");
		        console.log("Questions: " + totalQuestions);
		        console.log("Attempts: " + attempts);

		        // Disable multiple choices
		        $('#answers--option-1').attr('disabled', 'disabled');
		        $('#answers--option-2').attr('disabled', 'disabled');
		        $('#answers--option-3').attr('disabled', 'disabled');


		        $('main .results').text('Game Over! You answered ' + totalQuestions +
		          ' question(s) in ' + attempts + ' attempts.');
		        $('main .message').text('Click Start to play again.');
		        $('main .status').fadeIn();
		      }
		    } else {
		      console.log("Wrong Answer. Try Again");
		    }
		},
		events:{
			'click .answer-option':'checkAndContinue'
		}
	});

    return MainView;
});