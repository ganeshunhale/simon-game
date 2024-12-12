const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;
let yourScore = 0
let highestScore = localStorage.getItem('highScore') || 0
let startBtn = document.getElementById('start-btn')
let levelTitle = document.getElementById("level-title");

document.addEventListener("keydown", () => {
    if (!started) {
        document.getElementById("level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'Mobile';
    }
    if (/tablet|ipad/i.test(userAgent)) {
        return 'Tablet';
    }
    return 'Desktop';
}


let yourScoreElement = document.getElementById('your-score-span')
let highScoreElement = document.getElementById('high-score-span')
let crownEmoji = document.getElementById('crown-emoji')
highScoreElement.innerHTML = highestScore
if (getDeviceType() === "Mobile") {
    levelTitle.style.display = 'none'
    startBtn.setAttribute("style", "display: block !important;")
    startBtn.addEventListener("click", (e) => {
        console.log("clicled");
        if (!started) {
            nextSequence();
            started = true;
        }

    })
}


document.querySelectorAll("[role='button']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const userColor = e.target.id;
        userPattern.push(userColor);
        animatePress(userColor);
        checkAnswer(userPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {


    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);

            yourScore = yourScore + 1;
            yourScoreElement.innerText = yourScore
            console.log("highscoreafter", highestScore);
            highestScore = localStorage.getItem('highScore') || 0


            if (yourScore > highestScore) {

                highScoreElement.innerHTML = yourScore;
                crownEmoji.style.display = 'block';
                localStorage.setItem('highScore', yourScore)

            }
        }

    } else {
        // playSound("wrong");
        document.body.classList.add("bg-danger");
        setTimeout(() => {
            document.body.classList.remove("bg-danger");
        }, 200);
        document.getElementById("level-title").textContent =
            "Game Over! Press Any Key to Restart";
        resetGame();
        yourScore = 0;
        yourScoreElement.innerText = yourScore
        crownEmoji.style.display = 'none';
    }
}

function nextSequence() {
    startBtn.setAttribute("style", "display: none !important;")
    userPattern = [];
    level++;
    levelTitle.textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    const selectedButton = document.getElementById(randomColor);
    selectedButton.classList.add("btn-flash");
    setTimeout(() => {
        selectedButton.classList.remove("btn-flash");
    }, 300);

    // playSound(randomColor);
}

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(color) {
    const btn = document.getElementById(color);
    btn.classList.add("opacity-50");
    setTimeout(() => {
        btn.classList.remove("opacity-50");
    }, 100);
}

function resetGame() {
    level = 0;
    gamePattern = [];
    started = false;
}
