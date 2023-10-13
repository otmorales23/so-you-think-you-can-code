let highscores = document.getElementById("highscores")

function getHighscores() {
    let storedUsers;
    if (JSON.parse(localStorage.getItem("highscores")) === null) {
        storedUsers = [];
    } else {
        storedUsers = JSON.parse(localStorage.getItem("highscores"));
    }

    storedUsers.sort((a, b) => b.userScore - a.userScore);
    console.log(storedUsers);
    for (let i = 0; i < storedUsers.length; i++) {
        let scoresDiv = document.createElement("div")
        scoresDiv.textContent = "User: " + storedUsers[i].user + " Score: " + storedUsers[i].userScore
        highscores.append(scoresDiv)
    }
}

getHighscores();