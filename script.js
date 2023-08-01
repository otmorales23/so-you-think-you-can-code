let startBtn = document.getElementById("startBtn");
let timer = document.getElementById("timer");
let questions = document.getElementById("questions");
let choices = document.getElementById("choices");

//create array of questions
var questionArr = [
    {
        question: "JavaScript is a ___ -side programming language.",
        choices: ["Client", "Server", "Both"]
    },
    {
        question: "Which of the following keyords is used to define a variable in Javascript?",
        choices: ["var", "const", "char"]
    },

    {
        question: "What does HTML stand for?",
        choices: ["Hyperlink Text Manual Letters", "How To Make Latkes", "Hypertext Markup Language"]
    },

    {
        question: "What does CSS stand for?",
        choices: ["Colorful Style Sheets", "Cascading Style Sheets", "Can't Stand Supper"]
    },

    {
        question: "Which is the correct HTML element for the largest heading?",
        choices: ["<h4>", "<h372>", "<h1>"]
    },
]

questionIndex = 0
//create button that begins quiz
startBtn.addEventListener("click", function () {
    startBtn.style.display = "none"
    startTimer();
    runQuiz();
})

//create timer and start quiz
function startTimer() {
    let timerCount = 10
    timer.textContent = "Time: " + timerCount;
    let countdown = setInterval(() => {
        timerCount--
        timer.textContent = "Time: " + timerCount;
        if (timerCount <= 0) {
            clearInterval(countdown)
            timer.style.display = "none";
        }
    }, 1000);
}

//display question with choices
function runQuiz() {
    questions.textContent = questionArr[questionIndex].question
    for (let i = 0; i < questionArr[questionIndex].choices.length; i++) {
        let choiceBtn = document.createElement("button")
        choiceBtn.textContent = questionArr[questionIndex].choices[i]
        choices.append(choiceBtn)
    }

}

