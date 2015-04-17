/**
 * Consider levels as in platform games like Super Mario.
 *
 * A constructor here takes two arguments:
 * arrNumber:how many numbers are displayed
 * elNumber:how many questions for each level
 */

/**
 * @namespace Main application object
 */
var MathBeast = {
  // User input
  settings: {
    upperLimit: 0,
    operation: '',
    totalQuestions: 0
  },

  // State variables
  questions: [],
  currentQuestion: 0,
  attempts: 0,

  /**
   * Modify default settings to start a new game.
   *
   * @param {number} Upper limit for operands
   * @param {string} The operation
   * @param {number} Number of questions
   */
  start: function(upperLimit, operation, totalQuestions) {
    var validOptions = true;

    // Validate arguments
    if (!(typeof upperLimit === 'number' && (upperLimit % 1) === 0 && upperLimit > 0) ||
      !(typeof totalQuestions === 'number' && (totalQuestions % 1) === 0) && totalQuestions > 0) {
      validOptions = false;
      throw {
        name: "invalidInteger",
        message: "Both Upper Limit and Total Questions need to be integers greater than 0."
      };
    }

    if ((operation !== '+') && (operation !== '-') && (operation !== '*') &&
      (operation !== '/')) {
      validOptions = false;
      throw {
        name: "invalidOperation",
        message: "The operation is invalid. It needs to be one of the following:" +
        "+, -, * or /"
      };
    }

    if (validOptions) {
      this.settings.upperLimit = upperLimit;
      this.settings.operation = operation;
      this.settings.totalQuestions = totalQuestions;
      this.currentQuestion = 0;
      this.attempts = 0;
      this.questions = this.getQuestions();
    }

  },

  /**
   * Collect all questions
   *
   * @return {array} All questions and answers in an array of objects
   */
  getQuestions: function() {
    var questions = [];

    for (var i = 0; i < this.settings.totalQuestions; i++) {
      questions[i] = this.getQuestion();
    }

    return questions;
  },

  /**
   * Create a question and answer options
   *
   * @return {object} Question and answer options
   */
  getQuestion: function() {
    var operand1 = this.getOperand();
    var operand2 = this.getOperand();
    var operation = this.settings.operation;
    var answer = this.getAnswer(operand1, operand2);
    var answerOptions = this.getAnswerOptions(answer);

    return {
      operand1: operand1,
      operand2: operand2,
      operation: operation,
      answer: answer,
      answerOptions: answerOptions
    };

  },

  /**
   * Get current question
   *
   * @return {object} Question and answer options
   */
  getCurrentQuestion: function() {
    return this.questions[this.currentQuestion];
  },

  /**
   * Get current question
   *
   * @return {object} Question and answer options
   */
  getNextQuestion: function() {
    var next = false;

    // Check if there is a next question
    if (this.currentQuestion < (this.questions.length - 1)) {
      // Move iterator by one
      this.currentQuestion = this.currentQuestion + 1;
      next = this.questions[this.currentQuestion];
    }

    return next;
  },

  /**
   * Get current question
   *
   * @param {number}
   * @return {object} Question and answer options
   */
  attempt: function(attemptedAnswer) {
    // Increment number of attempts
    this.attempts = this.attempts + 1;

    // Assume wrong answer
    var result = {
      rightAnswer: false,
      nextQuestion: false
    };

    // Get current question
    currentQuestion = this.getCurrentQuestion();

    // Check if attempted answer matches correct answer
    if (attemptedAnswer === currentQuestion.answer) {
      // Update result type
      result.rightAnswer = true;

      // Get next question, if any
      var nextQuestion = this.getNextQuestion();

      // If game is not over, update nextQuestion
      if (nextQuestion !== false) {
        result.nextQuestion = nextQuestion;
      }
    }

    return result;
  },

  /**
   * Random number greater than or equal to 0 and less than or equal to upper limit
   *
   * @return {number} Random number
   */
  getOperand: function() {
    // TODO
    return 5;
  },

  /**
   * Perform math operation and return the result
   *
   * @param {number} First operand
   * @param {number} Second operand
   * @return {number} Result of math calculation
   */
  getAnswer: function(operand1, operand2) {
    // TODO
    return 10;
  },

  /**
   * Return numbers that are close to correct result (about 10% close)
   *
   * @param {number} correct answer
   * @return {array} List of one right answer and two wrong answers
   */
  getAnswerOptions: function(answer) {
    // TODO
    return [7, 10, 11];
  }

};

