(function($) {
  /**
   * Settings
   */
  // Show and hide settings
  //$('.settings-button').click(function() {
  //    $('.settings').fadeToggle();
  //  }
  //);

  // Use JQuery UI to replace operator dropdown with selectmenu widget
  $('#operation').buttonset();

  // Start game
  $('.settings-save').click(function() {
    var upperLimit = $('#upper-limit').val();
    var operation = $('#operation .ui-state-active span').text();
    var totalQuestions = 4;

    // Initialize game
    MathBeast.start(parseInt(upperLimit), operation, parseInt(totalQuestions));

    // Get first question
    var question = MathBeast.getCurrentQuestion();

    // Fill in question and answer values on markup
    $('#question--operand-1').text(question.operand1);
    $('#question--operation').text(question.operation);
    $('#question--operand-2').text(question.operand2);
    $('#answers--option-1').text(question.answerOptions[0]);
    $('#answers--option-2').text(question.answerOptions[1]);
    $('#answers--option-3').text(question.answerOptions[2]);

    $('main .instructions').fadeOut();
    $('main .question').fadeIn();
    $('main .answers').fadeIn();
  });

  // Next Question
  $('.answers .answer-option').click(function() {
    // Get current question
    var result = MathBeast.attempt(parseInt($(this).text()));
    if (result.rightAnswer) {
      console.log("Right Answer");
      if (result.nextQuestion) {
        var question = result.nextQuestion;
        // Fill in question and answer values on markup
        $('#question--operand-1').text(question.operand1);
        $('#question--operation').text(question.operation);
        $('#question--operand-2').text(question.operand2);
        $('#answers--option-1').text(question.answerOptions[0]);
        $('#answers--option-2').text(question.answerOptions[1]);
        $('#answers--option-3').text(question.answerOptions[2]);
      }
      else {
        var attempts = MathBeast.attempts;
        var totalQuestions = MathBeast.settings.totalQuestions;
        console.log("Game Over!");
        console.log("Questions: " + totalQuestions);
        console.log("Attempts: " + attempts);
      }
    }
    else {
      console.log("Wrong Answer. Try Again");
    }
  });


}(jQuery));