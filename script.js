
const btnRules = document.querySelectorAll(".rules-btn");
const btnNext = document.getElementById("next-btn");
const btnPlayagain = document.querySelector("#play-again");
const btnReplay = document.querySelector("#replay");
const btnClose = document.getElementById("close");

const rules = document.getElementById("rules-modal");

const win = document.querySelector(".winning");


const playboard = document.getElementById("game");


const resultboard = document.getElementById("result-page");
const userResult = document.querySelector(".user-result");
const computerResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let select = document.querySelectorAll(".picked");

const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");


let score = {
    user: 0,
    computer: 0,
};

if (localStorage.getItem("score")) {
    score = JSON.parse(localStorage.getItem("score"));
}

userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;



const result = {
    WIN: "YOU WIN",
    LOST: "YOU LOST",
    TIEUP: "TIE UP",
};



btnRules.forEach((element) => {
    element.addEventListener("click", () => {
        rules.style.display = "block";
    });
});

btnClose.addEventListener("click", () => {
    rules.style.display = "none";
});

btnNext.addEventListener("click", () => {
    playboard.style.display = "none";
    resultboard.style.display = "none";
    win.style.display = "flex";
});

btnPlayagain.addEventListener("click", playAgain);

btnReplay.addEventListener("click", playAgain);




function playAgain() {
    playboard.style.display = "grid";
    resultboard.style.display = "none";
    win.style.display = "none";
    btnNext.style.display = "none";
}

const computer = ["rock", "paper", "scissor"];

function computerPicked() {
    let picked = Math.floor(Math.random() * computer.length);
    return computer[picked];
}

function setImg(picked) {
    let img = `<img src="${picked}.png" alt=${picked} width="60px"/>`;
    return img;
}

function setStyles() {

    resultboard.style.marginTop = "48px";

    select.forEach((element) => {
        element.style.top = "300px";
    });

    for (let index = 0; index < 3; index++) {
        userResult.classList.remove("rock-div");
        userResult.classList.remove("paper-div");
        userResult.classList.remove("scissor-div");
        computerResult.classList.remove("rock-div");
        computerResult.classList.remove("paper-div");
        computerResult.classList.remove("scissor-div");
        btnPlayagain.style.display = "block";
        resultText2.style.display = "block";
        btnReplay.style.display = "none";
        btnNext.style.display = "none";
    }
}

let winubox1 = document.querySelector(".user-box-1");
let winubox2 = document.querySelector(".user-box-2");
let winubox3 = document.querySelector(".user-box-3");
let wincombox1 = document.querySelector(".pc-box-1");
let wincombox2 = document.querySelector(".pc-box-2");
let wincombox3 = document.querySelector(".pc-box-3");

let focusOnUserWinner = () => {
    wincombox1.classList.remove("winner-box-1");
    wincombox2.classList.remove("winner-box-2");
    wincombox3.classList.remove("winner-box-3");

    winubox1.classList.add("winner-box-1");
    winubox2.classList.add("winner-box-2");
    winubox3.classList.add("winner-box-3");
};
let focusOnPCWinner = () => {
    winubox1.classList.remove("winner-box-1");
    winubox2.classList.remove("winner-box-2");
    winubox3.classList.remove("winner-box-3");

    wincombox1.classList.add("winner-box-1");
    wincombox2.classList.add("winner-box-2");
    wincombox3.classList.add("winner-box-3");
};

let removeFocus = () => {
    winubox1.classList.remove("winner-box-1");
    winubox2.classList.remove("winner-box-2");
    winubox3.classList.remove("winner-box-3");

    wincombox1.classList.remove("winner-box-1");
    wincombox2.classList.remove("winner-box-2");
    wincombox3.classList.remove("winner-box-3");
};


const startGame = (userPicked) => {

    let pcPicked = computerPicked();

    setStyles();

    let res;

    if (userPicked === pcPicked) {

        res = result.TIEUP;

        removeFocus();

        btnPlayagain.style.display = "none";
        btnReplay.style.display = "block";
        resultText2.style.display = "none";

        select.forEach((element) => {
            element.style.top = "256px";
        });

        resultboard.style.marginTop = "6rem";

    }
    else if (
        (userPicked === "rock" && pcPicked === "scissor") ||
        (userPicked === "scissor" && pcPicked === "paper") ||
        (userPicked === "paper" && pcPicked === "rock")
    ) {
        res = result.WIN;

        btnNext.style.display = "block";

        focusOnUserWinner();


        score.user++;

    }
    else {
        res = result.LOST;

        focusOnPCWinner();


        score.computer++;

    }
    playboard.style.display = "none";
    resultboard.style.display = "flex";

    userResult.classList.add(`${userPicked}-div`);
    computerResult.classList.add(`${pcPicked}-div`);
    userResult.innerHTML = setImg(userPicked);
    computerResult.innerHTML = setImg(pcPicked);
    resultText.innerHTML = res;

    userScore.innerHTML = score.user;
    computerScore.innerHTML = score.computer;


    localStorage.setItem("score", JSON.stringify(score));
};




