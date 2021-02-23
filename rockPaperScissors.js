let playerWinCount = 0;
let computerWinCount = 0;

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(button => {
    button.addEventListener("click", playRound);
})

function getCompChoice() {
    let number = Math.floor(Math.random() * (9));
    let result = (number >= 6) ? "rock" :
        (number >= 3) ? "paper" : 
        (number < 3) ? "scissors" : "unknown";
    return result;
}

function playRound() {
    if (computerWinCount === 5 || playerWinCount === 5) {
        resetGame();
    }
    const comp = getCompChoice();
    const playerChoice = this.id;
    let winner;
    let winMessage;
    const displayMessage = document.createElement("li");

    if (comp === playerChoice) {
        winner = 'no winner'
        winMessage = `Both chose ${comp}, nobody wins.`;
        displayMessage.textContent = winMessage;
        document.querySelector(".results ul").appendChild(displayMessage);
        return winner;
    }

    if (comp === "rock") {
       if (playerChoice === "paper") {
           winner = "player";
           winMessage = "Player wins, paper beats rock!";
       } else {
           winner = "computer";
           winMessage = "Computer wins, rock beats scissors.";
       };
    };

    if (comp === "scissors") {
        if (playerChoice === "rock") {
            winner = "player";
            winMessage = "Player wins, rock beats scissors!";
        } else {
            winner = "computer";
            winMessage = "Computer wins, scissors beats paper.";
        }
    }

    if (comp === "paper") {
        if (playerChoice === "scissors") {
            winner = "player";
            winMessage = "Player wins, scissors beat paper!";
        } else {
            winner = "computer";
            winMessage = "Computer wins, paper beats rock.";
        }
    }
    displayMessage.textContent = winMessage;
    document.querySelector(".results ul").appendChild(displayMessage);
    updateScore(winner);

}

function resetGame() {
    computerWinCount = 0;
    playerWinCount = 0;
    updateScore();
    document.querySelector(".results ul").innerHTML = "";
}

function updateScore(winner) {
    if (winner === "computer") {
        computerWinCount += 1;
    } else if (winner === "player") {
        playerWinCount += 1;
    };

    document.querySelector("#playerScore").textContent = `Player Score: ${playerWinCount}`;
    document.querySelector("#compScore").textContent = `Computer Score: ${computerWinCount}`;

    const finalWinMessage = document.createElement('li');
    const results = document.querySelector(".results ul");
    if (playerWinCount === 5) {
        finalWinMessage.textContent = "Congrats, Player wins the game!"
    } else if (computerWinCount === 5) {
        finalWinMessage.textContent = "Bummer, Computer wins the game."
    }
    results.appendChild(finalWinMessage);
}