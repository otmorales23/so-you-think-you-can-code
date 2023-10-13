document.addEventListener("DOMContentLoaded", function () {

  let startBtn = document.getElementById("start");
  let timer = document.getElementById("timer-count");
  let questionsDiv = document.getElementById("questions");
  let choicesDiv = document.getElementById("choices");
  let scoreDiv = document.getElementById("score");
  let initialsForm = document.getElementById("initialsForm");
  let highscoresBtn = document.getElementById("highscoresBtn");
  let initials = document.getElementById("initials");

  // Your question array is well structured.
  var questionArr = [
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyperlink Markup Language",
        "How To Make Latkes",
        "Hypertext Markup Language",
        "Hyper Transfer Markdown Language"
      ],
      correctAnswer: 2
    },
    {
      question: "How do you declare a variable in JavaScript?",
      choices: [
        "var myVariable = 10;",
        "variable myVariables = 10;",
        "myVariable := 10;",
        "myVariable = 10;"
      ],
      correctAnswer: 0
    },
    {
      question: "How do you center a div element horizontally using CSS?",
      choices: [
        "margin: 0 auto;",
        "align: center;",
        "text-align: center;",
        "margin: center auto;"
      ],
      correctAnswer: 0
    },
    {
      question: "How do you add an item to the end of an array?",
      choices: [
        "myArray.add(5);",
        "myArray.push(5);",
        "myArray.put(5);",
        "myArray.append(5);"
      ],
      correctAnswer: 1
    },
    {
      question: "How do you align items to the center along the vertical axis using Flexbox?",
      choices: [
        "align-vertical: center;",
        "vertical-align: center;",
        "justify-content: center;",
        "align-items: center;"
      ],
      correctAnswer: 3
    },
    {
      question: "Which tag is used to insert a paragraph in HTML?",
      choices: [
        "<prg>",
        "<paragraph>",
        "<p>",
        "<text>"
      ],
      correctAnswer: 2
    },
    {
      question: "How do you include JavaScript in an HTML file?",
      choices: [
        "<javascript src='script.js'></javascript>",
        "<script src='script.js'></script>",
        "<js file='script.js'></js>",
        "<include src='script.js' type='text/javascript'></include>"
      ],
      correctAnswer: 1
    }
  ];

  let questionIndex = 0;
  let scoreCount = 0;
  let timerCount = 100;
  let storedUsers = JSON.parse(localStorage.getItem("highscores")) || [];

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    document.getElementById("hidden").style.display = "block";

    startTimer();
    runQuiz();
  });

  function startTimer() {
    timer.textContent = "Time Remaining: " + timerCount;
    let countdown = setInterval(() => {
      timerCount--;
      timer.textContent = "Time Remaining: " + timerCount;
      if (timerCount <= 0 || questionIndex === questionArr.length) {
        clearInterval(countdown);
        endQuiz();
      }
    }, 1000);
  }

  function runQuiz() {
    highscoresBtn.style.display = "none";
    scoreDiv.textContent = "Score: " + scoreCount + "/70";
    questionsDiv.textContent = questionArr[questionIndex].question;
    choicesDiv.innerHTML = ""; // Clear previous choices

    for (let i = 0; i < questionArr[questionIndex].choices.length; i++) {
      let choiceBtn = document.createElement("button");
      choiceBtn.className = "choiceBtn";
      choiceBtn.textContent = questionArr[questionIndex].choices[i];
      choiceBtn.addEventListener("click", function () {
        manageUserDecision(choiceBtn.textContent);
      });
      choicesDiv.append(choiceBtn);
    }
  }

  function manageUserDecision(userDecision) {
    if (userDecision === questionArr[questionIndex].choices[questionArr[questionIndex].correctAnswer]) {
      scoreCount += 10;
    } else {
      timerCount -= 10; // Penalty of 10 seconds
    }

    questionIndex++;

    if (questionIndex <= questionArr.length) {
      runQuiz();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    timer.style.display = "none";
    questionsDiv.style.display = "none";
    choicesDiv.style.display = "none";
    document.getElementById("quizEnd").style.display = "block";
    initialsForm.style.display = "flex";
    scoreDiv.style.display = "block";
  }

  function saveScore(e) {
    e.preventDefault();
    if (initials.value === "") {
      alert("Please enter your initials!");
      return;
    }

    let newScore = {
      user: initials.value,
      userScore: scoreCount
    };

    storedUsers.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(storedUsers));
    window.location = "./Assets/highscores.html";
  }

  initialsForm.addEventListener("submit", saveScore);
});
