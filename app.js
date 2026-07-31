let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let highScore = 0;
let btns = ["yellow", "red", "green", "blue"];
let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
    }
    if (highScoreDisplay) {
        highScoreDisplay.innerText = `Highest Score: ${highScore}`;
    }
}

document.addEventListener("keydown", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userflash(btn) {
    if (!btn) return;
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}
function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if(userseq.length === gameseq.length){
           setTimeout(levelup,1000);
        }
    }else{
        updateHighScore();
        h2.innerHTML = `Game Over ! <b>Your score was ${level}</b>. Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function levelup() {
    userseq = [];
    level++;
    updateHighScore();
    if (h2) {
        h2.innerHTML = `Level ${level}`;
    }
    let ranIdx = Math.floor(Math.random() * btns.length);
    let rancolor = btns[ranIdx];
    let ranbtn = document.querySelector(`.${rancolor}`);
    gameseq.push(rancolor);
    gameflash(ranbtn);
}
function btnpress(){
    let btn = this;
    userflash(btn);
    usercolor =btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
    btn.addEventListener("click", btnpress);
});
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}