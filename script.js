const questions = [
  {
    question: "Which is the Largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "London", correct: false }
    ]
  },
  {
    question: "Who was the first person to climb Mount Everest?",
    answers: [
      { text: "K2", correct: false },
      { text: "Everest", correct: true },
      { text: "Kangchenjunga", correct: false },
      { text: "Mount Kilimanjaro", correct: false }
    ]
  },
  {
    question: "What is the largest ocean in the world?",
    answers: [
      { text: "Pacific Ocean", correct: true },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }
    ]
  }
];

let timerElement = document.createElement("div");
timerElement.id = "timer";
timerElement.style.fontSize = "18px";
timerElement.style.color = "#001e4d";
timerElement.style.margin = "10px 0";
timerElement.style.fontWeight = "600";
document.querySelector(".quiz").prepend(timerElement);

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; // 30 seconds for the entire quiz
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer(); // Start the 30-second quiz timer
}

function startTimer() {
  timeLeft = 30; // Reset the time to 30 seconds
  clearInterval(timerInterval); // Clear any existing timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the timer when it hits 0
      showScore(); // Show score after the time is up
      disableQuiz(); // Disable the quiz when time is up
    }
  }, 1000); // Update every second
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function disableQuiz() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true; // Disable all answer buttons
  });
  nextButton.style.display = "none"; // Hide the next button
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
