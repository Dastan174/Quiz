//store question text, options and answers in an array
const questions = [
  {
    questionText: "What is the capital of Vietnam?",
    options: ["Vientan", "Hanoi", "Pnompen", "Thimphu"],
    answer: "Hanoi",
  },
  {
    questionText: "What is the capital of Zambia?",
    options: ["Lusaka", "Harare", "Maseru", "Rabat"],
    answer: "Lusaka",
  },
  {
    questionText: "What is the capital of Micronesia?",
    options: ["Nukualofa", "Yaren", "Palikir", "Victoria"],
    answer: "Palikir",
  },
  {
    questionText: "What is the capital of Kyrgyzstan?",
    options: ["Astana", "Dushanbe", "Tashkent", "Bishkek"],
    answer: "Bishkek",
  },
  {
    questionText: "What is the capital of Yemen?",
    options: ["Abu-Dhabi", "Sana", "Mascat", "Bagdad"],
    answer: "Sana",
  },
  {
    questionText: "What is the capital of Lithuania?",
    options: ["Vilnius", "Tallin", "Beirut", "Riga"],
    answer: "Vilnius",
  },
  {
    questionText: "What is the capital of Liechtenstein?",
    options: ["Balzers", "Triesenberg", "Vaduz", "Malbun"],
    answer: "Vaduz",
  },
  {
    questionText: "What is the capital of United States?",
    options: ["California", "Chicago", "Washington", "New York"],
    answer: "Washington",
  },
  {
    questionText: "What is the capital of Scotland?",
    options: ["Belfast", "Cardiff", "Dublin", "Edinburgh"],
    answer: "Edinburgh",
  },
  {
    questionText: "What is the capital of Honduras?",
    options: ["Buenos Aires", "Tegucigalpa", "Havana", "Acuncion"],
    answer: "Tegucigalpa",
  },
];

//select each card div by id and assign to variables
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");

//hide all cards
function hideCards() {
  startCard.setAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

//hide result div
function hideResultText() {
  resultDiv.style.display = "none";
}

//these variables are required globally
var intervalID;
var time;
var currentQuestion;

// select start button and function to start the quiz
document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  //hide any visible cards, show the question card
  hideCards();
  questionCard.removeAttribute("hidden");

  //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
  currentQuestion = 0;
  displayQuestion();

  //set total time depending on number of questions
  time = 120;

  //executes function "countdown" every 1000ms to update time and display on page
  intervalID = setInterval(countdown, 1000);

  //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
  displayTime();
}

//reduce time by 1 and display new value, if time runs out then end quiz
function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

//display time on page
const timeDisplay = document.querySelector("#time");
function displayTime() {
  timeDisplay.textContent = time;
}

//display the question and answer options for the current question
function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  let h2QuestionElement = document.querySelector("#question-text");
  h2QuestionElement.textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionButton = document.querySelector("#option" + i);
    optionButton.textContent = option;
  }
}

//behaviour when an answer button is clicked: click event bubbles up to div with id "quiz-options"
//eventObject.target identifies the specific button element that was clicked on
document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

//create counter to get +1 if there right answers
let scorePoint = 0;
//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  resultDiv.style.display = "block";
  if (optionIsCorrect(optionButton)) {
    resultText.textContent = "Correct!";
    scorePoint += 1;
    setTimeout(hideResultText, 1500);
  } else {
    resultText.textContent = "Incorrect!";
    setTimeout(hideResultText, 1500);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
      //if time is less than 10, display time as 0 and end quiz
      //time is set to zero in this case to avoid displaying a negative
      //number in cases where a wrong answer is submitted with < 10 seconds left on the timer
      time = 0;
      displayTime();
      endQuiz();
    }
  }

  //increment current question by 1
  currentQuestion++;
  //if we have not run out of questions then display next question, else end quiz
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

//display scorecard and hide other divs
const score = document.querySelector("#score");

//at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = `${scorePoint} out of 10`;
}
