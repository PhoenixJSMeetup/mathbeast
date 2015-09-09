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
define([
    'jquery',
    'underscore',
    'backbone',
],function($,_,backbone){
    var MathBeast = {
        // User input
        settings: {
            upperLimit: 0,
            operation: '',
            totalQuestions: 0,
            wrongAnswersPerQuestion: 2,
            wrongAnswerClosenessInPercentage: 10,
            timer: 5000
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
         *
         * @TODO allow rest of the settings to be configurable
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

            // Avoid divide by zero operation
            if (this.settings.operation === '/') {
                while (operand2 === 0) {
                    operand2 = this.getOperand();
                }
            }

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
         * Get next question
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
         * Attempt to solve question by providing answer as argument
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
            var currentQuestion = this.getCurrentQuestion();

            // Check if attempted answer matches correct answer
            if (attemptedAnswer == currentQuestion.answer) {
                // Update result type
                result.rightAnswer = true;
            }

            // Get next question, if any
            var nextQuestion = this.getNextQuestion();

            // If game is not over, update nextQuestion
            if (nextQuestion !== false) {
                result.nextQuestion = nextQuestion;
            }

            return result;
        },

        /**
         * Random number greater than or equal to 0 and less than or equal to upper limit
         *
         * @return {number} Random number
         */
        getOperand: function() {
            // Get upper limit
            var upperLimit = this.settings.upperLimit;

            // Random value between 0 and upperLimit
            var randomValue = Math.floor(Math.random() * (upperLimit + 1));

            return randomValue;
        },

        /**
         * Perform math operation and return the result
         *
         * @param {number} First operand
         * @param {number} Second operand
         * @return {number} Result of math calculation
         */
        getAnswer: function(operand1, operand2) {
            // Get operator
            var operator = this.settings.operation;

            return this.performMathOperation[operator](operand1, operand2);
        },

        /**
         * Object that contains multiple math operations
         *
         */
        performMathOperation: {
            // Addition
            '+': function(x, y) {
                return x + y
            },

            // Subtraction
            '-': function(x, y) {
                return x - y
            },

            // Multiplication
            '*': function(x, y) {
                return x * y
            },

            // Division
            '/': function(x, y) {

                // Don't allow a divide by zero division
                if (y === 0) {
                    throw {
                        name: "invalidOperation",
                        message: "Divide by zero is not allowed."
                    };
                }
                // Round to two decimal places
                return Math.round((x / y) * 100) / 100;
            }
        },

        /**
         * Return numbers that are close to correct result
         *
         * @param {number/string} correct answer
         * @return {array} The correct answer and some wrong answers
         */
        getAnswerOptions: function(answer) {
            // How close should the wrong answers be
            var closeness = this.settings.wrongAnswerClosenessInPercentage;
            // How many answer options
            var optionsCardinality = this.settings.wrongAnswersPerQuestion + 1;

            // Answer options
            var options = [answer];

            // Calculate % of correct answer
            var fraction = Math.ceil(answer * (closeness / 100));

            // Avoid having all answers equal to zero
            if (fraction === 0) {
                fraction = 1;
            }

            var lowerBound = Math.round((answer - fraction) * 100) / 100;
            var upperBound = Math.round((answer + fraction) * 100) / 100;
            var possibleAnswersRange = upperBound - lowerBound + 1;

            // Limit number of answers
            if (possibleAnswersRange < optionsCardinality) {
                optionsCardinality = possibleAnswersRange;
            }

            while (options.length < optionsCardinality) {
                // Random value between 0 and upperLimit
                var option = Math.floor(Math.random() * possibleAnswersRange) + lowerBound;

                // Make sure option is not already in options array
                while (options.indexOf(option) !== -1) {
                    option = Math.floor(Math.random() * possibleAnswersRange) + lowerBound;
                }

                // Add option to options array
                options.push(option);
            }

            return this.shuffle(options);
        },

        shuffle: function(items) {
            var shuffledItems = [];
            var randomIndex = 0;

            // Shuffle items
            while (shuffledItems.length < items.length) {

                // Random value between 0 and items.length - 1
                randomIndex = Math.floor(Math.random() * items.length);

                // If element isn't false, add element to shuffled items
                if(items[randomIndex] !== false ) {

                    // Add new element to shuffled items
                    shuffledItems.push(items[randomIndex]);

                    // Set element to false to avoid being reused
                    items[randomIndex] = false;
                }

            }

            return shuffledItems;
        }

    };
    return MathBeast;
})

