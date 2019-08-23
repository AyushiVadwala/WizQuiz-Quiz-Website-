function cpprg() {
  var questions1 = [{
    question: "Which of the following type of class allows only one object of it to be created?",
    choices: ["Virtual class","Abstract class","Singleton class","Friend class"],
    correctAnswer: 2
  }, {
    question: "Which of the following is not the member of class?",
    choices: ["Static function","Friend function","Const function","Virtual function"],
    correctAnswer: 1
  }, {
    question: "Which of the following concepts means determining at runtime what method to invoke?",
    choices: ["Data hiding","Dynamic Typing","Dynamic binding","Dynamic loading"],
    correctAnswer: 2
  }, {
    question: "How many instances of an abstract class can be created?",
    choices: [1,13,5,0],
    correctAnswer: 3
  }, {
    question: "Which of the following concepts of OOPS means exposing only necessary information to client?",
    choices: ["Encapsulation","Abstraction","Data hiding","Data binding"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var cppquiz = $('#cppquiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#cppnext').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(cppquiz.is(':animated')) {        
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
  $('#cppprev').on('click', function (e) {
    e.preventDefault();
    
    if(cppquiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#cppstart').on('click', function (e) {
    e.preventDefault();
    
    if(cppquiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#cppstart').hide();
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
    
    var question = $('<p>').append(questions1[index].question);
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
    for (var i = 0; i < questions1[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions1[index].choices[i];
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
    cppquiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions1.length){
        var nextQuestion = createQuestionElement(questionCounter);
        cppquiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#cppprev').show();
        } else if(questionCounter === 0){
          
          $('#cppprev').hide();
          $('#cppnext').show();
        }
      }else {
        var scoreElem = displayScore();
        cppquiz.append(scoreElem).fadeIn();
        $('#cppnext').hide();
        $('#cppprev').hide();
        $('#cppstart').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions1[i].correctAnswer) {
        numCorrect++;
      }
    }
    
     score.append('<br><br><br><br><p align="center">You got ' + numCorrect + ' questions out of ' +
                 questions1.length + ' right!!!'+"<br><br><br><br><br>");
    return score;
  }
}