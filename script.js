const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const victory = document.getElementById("victory");
const chooseButton = document.querySelectorAll("button");
const setPlayerScore = document.getElementById("player-score");
const setComputerScore = document.getElementById("computer-score");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const outcomes = document.getElementById("outcomes");

let playerScore = 0;
let computerScore = 0;
let disableButton;
// 0 = rock, 1 = paper, 2 = scissors

//FUCNTIONS
//get localstorage for score
const populateUI = () => {
  playerScore = JSON.parse(localStorage.getItem("playerScore"));
  computerScore = JSON.parse(localStorage.getItem("computerScore"));
  setComputerScore.innerText = computerScore;
  setPlayerScore.innerText = playerScore;
};

//disable button
const DisableButton = () => {
  chooseButton.forEach((item) => {
    item.classList.add("unable");
  });

  setTimeout(() => {
    chooseButton.forEach((item) => {
      item.classList.remove("unable");
    });
  }, 2000);

  rockButton.disabled = true;
  setTimeout(() => {
    rockButton.disabled = false;
  }, 2000);
  paperButton.disabled = true;
  setTimeout(() => {
    paperButton.disabled = false;
  }, 2000);
  scissorsButton.disabled = true;
  setTimeout(() => {
    scissorsButton.disabled = false;
  }, 2000);
};

//add animation
const AddAnimation = () => {
  playerChoice.src = "img/rockImg.png";
  computerChoice.src = "img/rockImg.png";

  outcomes.classList.add("vert-move");
  setTimeout(() => {
    outcomes.classList.remove("vert-move");
  }, 2000);
};

//computer makes choice
const MakingChoice = (PlayerChosen) => {
  const choiceNum = Math.floor(Math.random() * 3);

  playerChoice.src = `img/${PlayerChosen}Img.png`;
  playerChoice.alt = `${PlayerChosen}`;

  switch (choiceNum) {
    case 0:
      computerChoice.src = "img/rockImg.png";
      computerChoice.alt = "rock";
      break;
    case 1:
      computerChoice.src = "img/paperImg.png";
      computerChoice.alt = "paper";
      break;
    case 2:
      computerChoice.src = "img/scissorsImg.png";
      computerChoice.alt = "scissors";
      break;
  }
};

//checking who has won
const Victory = () => {
  const checkPlayerChoice = playerChoice.alt;
  const checkComputerChoice = computerChoice.alt;

  victory.className = "";
  //player chooses rock
  if (checkPlayerChoice === "rock" && checkComputerChoice === "rock") {
    victory.innerText = "IT'S A DRAW";
    victory.classList.toggle("draw");
  } else if (checkPlayerChoice === "rock" && checkComputerChoice === "paper") {
    victory.innerText = "YOU LOSE";
    victory.classList.toggle("loss");
    computerScore += 1;
    setComputerScore.innerText = computerScore;
    localStorage.setItem("computerScore", computerScore);
  } else if (
    checkPlayerChoice === "rock" &&
    checkComputerChoice === "scissors"
  ) {
    victory.innerText = "YOU WIN";
    victory.classList.toggle("win");
    playerScore += 1;
    setPlayerScore.innerText = playerScore;
    localStorage.setItem("playerScore", playerScore);
  }
  //player chooses paper
  if (checkPlayerChoice === "paper" && checkComputerChoice === "rock") {
    victory.innerText = "YOU WIN";
    victory.classList.toggle("win");
    playerScore += 1;
    setPlayerScore.innerText = playerScore;
    localStorage.setItem("playerScore", playerScore);
  } else if (checkPlayerChoice === "paper" && checkComputerChoice === "paper") {
    victory.innerText = "IT'S A DRAW";
    victory.classList.toggle("draw");
  } else if (
    checkPlayerChoice === "paper" &&
    checkComputerChoice === "scissors"
  ) {
    victory.innerText = "YOU LOSE";
    victory.classList.toggle("loss");
    computerScore += 1;
    setComputerScore.innerText = computerScore;
    localStorage.setItem("computerScore", computerScore);
  }
  //player chooses scissors
  if (checkPlayerChoice === "scissors" && checkComputerChoice === "rock") {
    victory.innerText = "YOU LOSE";
    victory.classList.toggle("loss");
    computerScore += 1;
    setComputerScore.innerText = computerScore;
    localStorage.setItem("computerScore", computerScore);
  } else if (
    checkPlayerChoice === "scissors" &&
    checkComputerChoice === "paper"
  ) {
    victory.innerText = "YOU WIN";
    victory.classList.toggle("win");
    playerScore += 1;
    setPlayerScore.innerText = playerScore;
    localStorage.setItem("playerScore", playerScore);
  } else if (
    checkPlayerChoice === "scissors" &&
    checkComputerChoice === "scissors"
  ) {
    victory.innerText = "IT'S A DRAW";
    victory.classList.toggle("draw");
  }
};

//EVENT LISTENERS
//click voor choices
chooseButton.forEach((item) => {
  item.addEventListener("click", () => {
    DisableButton();
    AddAnimation();
    setTimeout(() => {
      MakingChoice(item.id);
      Victory();
    }, 2000);
  });
});

populateUI();
