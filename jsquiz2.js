function javaprg() {
  var questions2 = [{
    question: " A special method that is used to initialize a class object ?",
    choices: ["abstract method","static method","Constructor","overloaded method"],
    correctAnswer: 2
  }, {
    question: "super keyword in Java is used for?",
    choices: ["to refer to immediate child class of a class.","to refer to immediate parent class of a class.","to refer to current class object.","to refer to static member of parent class."],
    correctAnswer: 1
  }, {
    question: "Which of the given statement is not true about a Java Package?",
    choices: ["A package can be defined as a group of similar types of classes and interface.","Package are used in order to avoid name conflicts and to control access of classes and interface.","A package cannot not have another package inside it.","Java uses file system directory to store package"],
    correctAnswer: 2
  }, {
    question: "What is an immutable object?",
    choices: ["an object whose state can be changed after it is created.","an object whose state cannot be changed after it is created.","an object which cannot be casted to another type.","an object which cannot be cloned."],
    correctAnswer: 1
  }, {
    question: " In Java, by default every thread is given a _________ .",
    choices: ["MIN_PRIORITY(0)","NORM_PRIORITY(5)","MAX_PRIORITY(10)","HIGH_PRIORITY(7)"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var javaquiz = $('#javaquiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#javanext').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(javaquiz.is(':animated')) {        
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
  $('#javaprev').on('click', function (e) {
    e.preventDefault();
    
    if(javaquiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#javastart').on('click', function (e) {
    e.preventDefault();
    
    if(javaquiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#javastart').hide();
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
    
    var question = $('<p>').append(questions2[index].question);
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
    for (var i = 0; i < questions2[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions2[index].choices[i];
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
    javaquiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions2.length){
        var nextQuestion = createQuestionElement(questionCounter);
        javaquiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#javaprev').show();
        } else if(questionCounter === 0){
          
          $('#javaprev').hide();
          $('#javanext').show();
        }
      }else {
        var scoreElem = displayScore();
        javaquiz.append(scoreElem).fadeIn();
        $('#javanext').hide();
        $('#javaprev').hide();
        $('#javastart').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions2[i].correctAnswer) {
        numCorrect++;
      }
    }
    
     score.append('<br><br><br><br><p align="center">You got ' + numCorrect + ' questions out of ' +
                 questions2.length + ' right!!!'+"<br><br><br><br><br>");
    return score;
  }
}