let startBtn = document.getElementById("startBtn");
let timer = document.getElementById("timer");
let questions = document.getElementById("questions");
let choices = document.getElementById("choices");
let score = document.getElementById("score");
let initialsForm = document.getElementById("initialsForm");

//create array of questions
var questionArr = [
    {
        question: "JavaScript is a ___ -side programming language.",
        choices: ["Client", "Server", "Both"],
        answer: "Both"
    },
    {
        question: "Which of the following keyords is used to define a variable in Javascript?",
        choices: ["var", "const", "char"],
        answer: "var"
    },

    {
        question: "What does HTML stand for?",
        choices: ["Hyperlink Text Manual Letters", "How To Make Latkes", "Hypertext Markup Language"],
        answer: "Hypertext Markup Language"
    },

    {
        question: "What does CSS stand for?",
        choices: ["Colorful Style Sheets", "Cascading Style Sheets", "Can't Stand Supper"],
        answer: "Cascading Style Sheets"
    },

    {
        question: "Which is the correct HTML element for the largest heading?",
        choices: ["<h4>", "<h372>", "<h1>"],
        answer: "<h1>"
    },
]

let questionIndex = 0
let scoreCount = 0
let timerCount = 75
let storedUsers;

//create button that begins quiz
startBtn.addEventListener("click", function () {
    startBtn.style.display = "none"
    startTimer();
    runQuiz();
})

//create timer and start quiz
function startTimer() {
    timer.textContent = "Time: " + timerCount;
    let countdown = setInterval(() => {
        timerCount--
        timer.textContent = "Time: " + timerCount;
        if (timerCount <= 0) {
            clearInterval(countdown);
            endQuiz()
        }
    }, 1000);
}

//display question with choices
function runQuiz() {
    score.textContent = "Score: " + scoreCount
    questions.textContent = questionArr[questionIndex].question
    for (let i = 0; i < questionArr[questionIndex].choices.length; i++) {
        let choiceBtn = document.createElement("button")
        choiceBtn.textContent = questionArr[questionIndex].choices[i]
        choiceBtn.addEventListener("click", function () {
            manageUserDecision(choiceBtn.textContent);
        })
        choices.append(choiceBtn)
    }

}

// manage user decision
function manageUserDecision(userDecision) {
    console.log(userDecision);
    if (userDecision === questionArr[questionIndex].answer) {
        scoreCount += 10;
    } else {
        timerCount -= 5;
    }
    questionIndex++
    choices.innerHTML = ""

    if(questionIndex === questionArr.length) {
       return endQuiz()
    }
    runQuiz()
}

//when finished end quiz (input initials)
function endQuiz() {
    timer.style.display = "none"
    questions.style.display = "none"
    choices.style.display = "none"
    initials.style.display = "block"
}


function onPageLoad () {
    initials.style.display = "none"
    if(JSON.parse(localStorage.getItem("highscores")) === null) {
        storedUsers = []
    }
    else {
        storedUsers = JSON.parse(localStorage.getItem("highscores"))
    }
    console.log(storedUsers);
}

onPageLoad()

//save highscore in local storage
function saveScore (e) {
    e.preventDefault();
    let newScore = {
        user: initials.value,
        userScore: scoreCount
    }
    storedUsers.push(newScore)
    localStorage.setItem("highscores", JSON.stringify(storedUsers))

    window.location = "highscores.html"
}
initialsForm.addEventListener("submit", saveScore)