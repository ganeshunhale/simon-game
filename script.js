const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;
let yourScore = 0
let highestScore = localStorage.getItem('highScore') || 0

document.addEventListener("keydown", () => {
    if (!started) {
        document.getElementById("level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});



let yourScoreElement = document.getElementById('your-score-span')
let highScoreElement = document.getElementById('high-score-span')
let crownEmoji = document.getElementById('crown-emoji')
highScoreElement.innerHTML = highestScore


document.querySelectorAll("[role='button']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const userColor = e.target.id;
        userPattern.push(userColor);
        playSound(userColor);
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
            if (yourScore > highestScore) {
                highScoreElement.innerHTML = yourScore;
                crownEmoji.style.display = 'block';
            }
        }

    } else {
        playSound("wrong");
        document.body.classList.add("bg-danger");
        setTimeout(() => {
            document.body.classList.remove("bg-danger");
        }, 200);
        document.getElementById("level-title").textContent =
            "Game Over! Press Any Key to Restart";
        resetGame();
        localStorage.setItem('highScore', yourScore)
        yourScore = 0;
        yourScoreElement.innerText = yourScore
        crownEmoji.style.display = 'none';
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    document.getElementById("level-title").textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    const selectedButton = document.getElementById(randomColor);
    selectedButton.classList.add("btn-flash");
    setTimeout(() => {
        selectedButton.classList.remove("btn-flash");
    }, 300);

    playSound(randomColor);
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
