const startQuizButtonEl = document.querySelector("#startQuiz");
const startEl = document.querySelector(".start");
const questionsEl = document.querySelector(".questions");
const showHighestScoreEl = document.querySelector("#showHighestScore");
const highestScoreEl = document.querySelector(".highScores");
const initialEl = document.querySelector(".initials");
const timerEl = document.querySelector("#timer");
const startScreenEl = document.querySelector(".startScreen");
const initialBtn = document.querySelector("#initialButton");


let counter = 60;
let nextIterator = 0; 
let timer;

const questions = [
    { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Golgi Apparatus", "Ribosome"] },
    { question: "What kind of bear is best?", options: ["Brown Bear", "Black Bear", "Koala Bear", "Panda Bear"] },
    { question: "What is 9 + 10?", options: ["8", "910", "21", "What?"] },
    { question: "Where does Spongebob work?", options: ["In-n-Out", "Burger King", "Chuck-e-Cheese", "The Krusty Krab"] },
];

const questionAnswers = [
    {questionNumber: 0, optionNumber: 0},
    {questionNumber: 1, optionNumber: 1},
    {questionNumber: 2, optionNumber: 2},
    {questionNumber: 3, optionNumber: 3},
];

const startQuiz = () => {
    startEl.setAttribute("class", "hide");
    questionsEl.classList.remove("hide");
    startScreenEl.setAttribute("class", "hide");

    const currentQuestion = questions[nextIterator];
    createAndShowQuestion(currentQuestion);
    startTimer();
}

const startTimer = () => {
    timer = setInterval(function () {
        counter--;
        timerEl.innerHTML = "Time Left: " + counter + "s";

        if (counter <= 0) {
            clearInterval(timer);
            showInitial();
            return null;
        }
    }, 1000)
}

const createAndShowQuestion = (question) => {
    if (!question) {
        showInitial();
        return null;
    }

    const h2El = document.createElement("h2");
    h2El.innerText = question.question;

    const optionsDiv = document.createElement("div");
    optionsDiv.setAttribute("class", "options");


    for (let index = 0; index < question.options.length; index++) {
        const newButtonEl = document.createElement("button");
        newButtonEl.innerText = question.options[index];
        optionsDiv.appendChild(newButtonEl);
        newButtonEl.onclick = nextQuestion;
    }

    // Clear what was inside the questions
    questionsEl.innerHTML = "";
    questionsEl.appendChild(h2El);
    questionsEl.appendChild(optionsDiv);
    nextIterator++;
}

const showInitial = () => {
    questionsEl.setAttribute("class", "hide");
    initialEl.classList.remove("hide");
    initialBtn.onclick = showHighestScore;
}


const nextQuestion = () => {
    const currentQuestion = questions[nextIterator];
    createAndShowQuestion(currentQuestion);
    const correctAnswer = questionAnswers;
    // TODO: figure out what's the right and correct answer
    for (var i = 0; i < currentQuestion.length; i++)
        if (currentQuestion.question[i] && currentQuestion.options[i] !== correctAnswer[i] && correctAnswer[i]) {
            counter -= 10;
        } 
}

const showHighestScore = () => {
    highestScoreEl.classList.remove("hide");
    // Hide any other sections
    questionsEl.classList.add("hide");
    startEl.classList.add("hide");
    initialEl.classList.add("hide");
    startScreenEl.setAttribute("class", "hide");
}

startQuizButtonEl.onclick = startQuiz;
showHighestScoreEl.onclick = showHighestScore;
initialBtn.onclick = showHighestScore;