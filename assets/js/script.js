let timer; 
let penalityTimeDeduction = 10; //10 sec
let finalScore = 0;

let scoreDataRaw = localStorage.getItem("score");
let scoreData = {};
let timerIimeout;
let timerInterval;
let answeringQuestion = false;


if (scoreDataRaw)
  scoreData = JSON.parse( scoreDataRaw );


//begin with question 1
let currentQuestion = 1; 


let thisQuestionData = {};


//set up all the questions and answers
let questionData = {
  q1: {
    question: "Common used data types DO not include:",
    answerChoice: ["strings", "boolean", "alerts", "numbers"], //max 4 choices
    answer: "alerts"
  },

  q2: {
    question: "JavaScript is only used in front-end web development.",
    answerChoice: ["true", "false"],
    answer: "false"
  },

  q3: {
    question: "The condition in an if / else statement is enclosed with _________.",
    answerChoice: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
  },

  q4: {
    question: "Arrays in JavaScript can be used to store _________.",
    answerChoice: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },

  q5: {
    question: "String value must be enclosed with _________ when being assigned to variables.",
    answerChoice: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },

  q6: {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerChoice: ["Javascript", "terminal/bash", "loops", "console.log"],
    answer: "console.log"
  }
}



document.querySelector("#top-score-table").innerHTML = highScoreHtml ();


function updateTimer () {

  //update timer in display
  document.querySelector("#timer").innerHTML = "Time: " + timer;
}




function questStart () {
  
  //start question 1;
  currentQuestion = 1; 

  timer = 75; 
  finalScore = 0;

  
  document.querySelector("#view-top-score").style.display = 'none';
  document.querySelector("#intro-section").style.display = 'none';
  document.querySelector("#quiz-section").style.display = 'block';


  //question show
  questionShow ();



  //display initial timer on page
  updateTimer ();


  timerInterval = setInterval(function() {

    if(timer <= 0) {
      //end the game when time is up
      
      clearInterval(timerInterval);
      gameover ();

    }
    else
    {
      updateTimer (); 
    }
 

    timer--;

  }, 1000);
}




//start question or next question
function questionShow () {
  
  answeringQuestion = false;
  
  
  if (document.querySelector("#result").innerHTML != "")
  {
    //update result div
    document.querySelector("#result").innerHTML = "";
  }

  thisQuestionData = questionData["q" + currentQuestion];

  //console.log (thisQuestionData) 
  if (questionData["q" + currentQuestion])
  {
   
    
    document.querySelector("#question").innerHTML = thisQuestionData.question;


    //first hide all answer box
    document.querySelectorAll('.answer-choice').forEach(function(el) {
      el.style.display = 'none';
    });


    //show the number of answer box base on the questionData.q1.answerChoice.length
    for (let i = 0; i < thisQuestionData.answerChoice.length; i++)
    {
      if (thisQuestionData.answerChoice[i])
      {
        document.querySelector("#ac" + i).style.display = 'block';

        document.querySelector("#ac" + i).innerHTML = (i + 1) + ". " + thisQuestionData.answerChoice[i];
      }

    }



  }
  else
  {
    //game ended and display final score
    //console.log ('quest ended');
    gameover ();
    
  }

  //move to next question
  currentQuestion++;

}



//excute when user click on answer
function answer (answerPick) {


  if (answeringQuestion == false)
  {
    answeringQuestion = true; //prevent double click on answer


    //console.log (answerPick);

    //console.log (thisQuestionData.answerChoice[answerPick], thisQuestionData.answer)

    clearTimeout (timerIimeout);

    if (thisQuestionData.answerChoice[answerPick] == thisQuestionData.answer)
    {
      //correct answer 
      document.querySelector("#result").innerHTML = "<img src='./assets/images/emoji-happy.png'> CORRECT!";
    }
    else
    {
      //incorrect answer 
      document.querySelector("#result").innerHTML = "<img src='./assets/images/emoji-sad.png'> WRONG!";


      timer = timer - penalityTimeDeduction;
      if (timer < 0)
      {
        timer = 0;
      }

      updateTimer (); 

      
    }

    var timerIimeout = setTimeout(function() {

      questionShow ();

    }, 700);
  }  
}




//restart game
function restart () {

  document.querySelector("#intro-section").style.display = 'block';
  document.querySelector("#quiz-section").style.display = 'none';
  document.querySelector("#score-submit-section").style.display = 'none';
  document.querySelector("#score-section").style.display = 'none';

  if (scoreData)
    if (Object.keys(scoreData).length > 0)
      document.querySelector("#view-top-score").style.display = 'block';

}

//end game and display score
function gameover () {
  
  //clear interval 
  clearInterval (timerInterval);
  
  //hide quiz section
  document.querySelector("#quiz-section").style.display = 'none';

  //show score section
  document.querySelector("#score-submit-section").style.display = 'block';
  document.querySelector("#score-section").style.display = 'block';

  finalScore = timer;

  document.querySelector("#final-score").innerHTML = "Your final score is " + finalScore + ".";
  


  //load score data from localStorage
  
  if (scoreData)
  {
    //console.log (scoreDataRaw);
    
    document.querySelector("#high-score-div").innerHTML = highScoreHtml ();
  }
  else
  {
    document.querySelector("#high-score-div").innerHTML = "No high score yet";

  }
}


function highScoreHtml () {

  //sort high score data

  if (scoreData)
  {
    if (Object.keys(scoreData).length === 0)
    {
      document.querySelector("#view-top-score").style.display = 'none';
      return "<ul><li>No high score yet</li></ul>";
    }


    let sortedHighScore = [];
    for (let player in scoreData) {
      sortedHighScore.push([player, scoreData[player]]);
    }

    sortedHighScore.sort(function(a, b) {
    
      return a[1].score - b[1].score;
    });

  
    
    let highScoreHtml = "";
    let thisScoreData = {};

    for (let i = sortedHighScore.length - 1; i >= 0; i--) {
      
      thisScoreData = sortedHighScore[i][1];
      highScoreHtml += "<li><div id='li-score' class='li-score'>" + thisScoreData.score + "</div><div class='li-score'> " + thisScoreData.name + "</li>";
    }

    return "<ul>" + highScoreHtml + "</ul>";

  }
  else
  {
    document.querySelector("#view-top-score").style.display = 'none';
    return "<ul><li>No high score yet</li></ul>";
  }
    
}



//save score 
function scoreSave () {

  let playerName = document.getElementById("name").value;

  //console.log (playerName)

  if (playerName && playerName.length > 0) //player name is not empty
  {
    let datakey = "hs" + playerName.replace(/[^a-zA-Z0-9]/g, '');
    
    scoreData[datakey] = {name: playerName, score: finalScore};


    
    //save to local storage in browser
    //console.log (JSON.stringify(scoreData));
    localStorage.setItem("score", JSON.stringify(scoreData));

    //update high score table display
    document.querySelector("#high-score-div").innerHTML = highScoreHtml ();
    document.querySelector("#top-score-table").innerHTML = highScoreHtml ();


    document.querySelector("#score-submit-section").style.display = 'none';

    

    document.getElementById("name").value = '';
    
  }
  else
  {
    //display warning
    document.querySelector("#score-submit-tip").innerHTML = "Please enter your name.";
  }
  
}



//reset score
function scoreRemove () {

  localStorage.removeItem('score');
  scoreData = {};


  document.querySelector("#top-score-table").innerHTML = highScoreHtml ();
  document.querySelector("#high-score-div").innerHTML = "High score list has been reset";
}

