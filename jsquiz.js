function cprg() {
	var questions = [{
		question: "For 16-bit compiler allowable range for integer constants is ________?",
		choices: ["-32767 to 32768","-32668 to 32667"," -32768 to 32767","-3.4e38 to 3.4e38"],
		correctAnswer: 2
		}, {
		question: "C programs are converted into machine language with the help of",
		choices: ["An Editor","A compiler","An operating system","None of these"],
		correctAnswer: 1
		}, {
		question: "Standard ANSI C recognizes ______ number of keywords?",
		choices: [30,32,44,45],
		correctAnswer: 1
		}, {
		question: "Which one of the following is not a reserved keyword for C?",
		choices: ["case","default","main","register"],
		correctAnswer: 2
		}, {
		question: "Which of the following is not a correct variable type?",
		choices: ["real","int","double","char"],
		correctAnswer: 0
	}];
  
	var questionCounter = 0; //Tracks question number
	var selections = []; //Array containing user choices
	var cquiz = $('#cquiz'); //Quiz div object  
	// Display initial question
	displayNext();
  
	// Click handler for the 'next' button
	$('#cnext').on('click', function (e) {
		e.preventDefault();
    
		// Suspend click listener during fade animation
		if(cquiz.is(':animated')) {        
			return false;
		}
		choose();
    
		// If no user selection, progress is stopped
		if (isNaN(selections[questionCounter])) {
			alert('Please make a selection!');
		} else {
			questionCounter++;
			displayNext();
		}
	});
  
  // Click handler for the 'prev' button
	$('#cprev').on('click', function (e) {
    e.preventDefault();
    
    if(cquiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#cstart').on('click', function (e) {
    e.preventDefault();
    
    if(cquiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#cstart').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    cquiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        cquiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
         
        } else if(questionCounter === 0){
          
          $('#cprev').hide();
          $('#cnext').show();
        }
      }else {
        var scoreElem = displayScore();
        cquiz.append(scoreElem).fadeIn();
        $('#cnext').hide();
        $('#cprev').hide();
        $('#cstart').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
     score.append('<br><br><br><br><p align="center">You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!'+"<br><br><br><br><br>");
    return score;
  }
}