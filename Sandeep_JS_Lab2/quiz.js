function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
}

Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};

Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};

Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    "_____ is used to find and fix bugs in the Java programs.",
    ["JVM", "JRE", "JDK", "JDB"],
    "JDB"
  ),
  new Question(
    "What is the return type of the hashCode() method in the Object class.",
    ["object", "int", "long", "void"],
    "int"
  ),
  new Question(
    "Which of the following is a valid long literal",
    ["ABH8097", "L990023", "04423", "0xnf029L"],
    "0xnf029L"
  ),
  new Question(
    "What does the expression float a = 35 / 0 return",
    ["0", "not a number", "infinity", "exception"],
    "infinity"
  ),
  new Question(
    "In which process, a local variable has the same name as one of the instance variables",
    ["Serialization", "Variable Shadowing", "Abstraction", "Multi-threading"],
    "Variable Shadowing"
  ),
  new Question(
    "Which of the following is an immediate subclass of the Panel class",
    ["Applet class", "Window class", "Frame class", "Dialog class"],
    "Applet class"
  ),
  new Question(
    "Which keyword is used for accessing the features of a package",
    ["package", "import", "extends", "export"],
    "import"
  )
];

function showScores() {
  console.log("Scores :-", quiz.score);
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += `<h2 id='score'> Your Scores:- ${
    quiz.score
  } and mark percentage is :- ${(quiz.score / questions.length) * 100}% </h1>`;
  document.getElementById("quiz").innerHTML = gameOverHTML;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById("question");
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById("choice" + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn("btn" + i, currOption);
      }
    } 
    showProgress();
  }
}

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById("progress");
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
}

let quiz = new Quiz(questions);


loadQuestions();
