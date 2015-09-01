'use strict';

var questions = {
	0: {
		question: 'How do you web properly?',
		correct: 'JavaScript',
		answers: ['PHP', 'Go', 'Perl']
	},
	1: {
		question: 'What\'s the coolest style technology?',
		correct: 'CSS',
		answers: ['LESS', 'SCSS', 'Compass']
	},
	2: {
		question: 'What template engine should I use?',
		correct: 'HTML',
		answers: ['Jade', 'Mustache', 'Underscore']
	}
};

function Quiz( questions ) {
	this.questions = questions;
	this.progress = 0;
	this.end = Object.keys( this.questions ).length;

	return this;
}

Quiz.prototype.init = function init() {
	this.renderQuestion();
};

Quiz.prototype.renderQuestion = function renderQuestion() {
	var currentQuestion = this.questions[this.progress];

	currentQuestion.answers.push( currentQuestion.correct );

	this.setQuestion( currentQuestion.question );
	this.setChoices( currentQuestion.answers );
	this.setProgress( this.progress );
};

Quiz.prototype.setQuestion = function setQuestion( question ) {
	var questionEl = document.getElementById( 'question' );

	questionEl.textContent = question;
};

Quiz.prototype.setChoices = function setChoices( choices ) {
	var answers = document.getElementById( 'answers' );
	var id, newAnswer;

	answers.innerHTML = '';

	for ( id in choices ) {
		newAnswer = document.createElement( 'button' );

		newAnswer.value = newAnswer.textContent = choices[id];

		newAnswer.onclick = this.handleChoice.bind( this );

		answers.appendChild( newAnswer );
	}
};

Quiz.prototype.setProgress = function setProgress( progress ) {
	var progressEl = document.getElementById( 'progress' );
	progressEl.textContent = progress + ' of ' + this.end + ' complete';
};

Quiz.prototype.handleChoice = function handleChoice( event ) {
	event.preventDefault();

	var choice = event.target.value;
	var correct = this.questions[this.progress].correct;

	if ( choice === correct ) {
		this.progress++;
		this.renderQuestion();
	}
};

var quiz = new Quiz( questions );

quiz.init();
