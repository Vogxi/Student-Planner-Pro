// ==========================================
// Pomodoro Timer
// ==========================================

let timer;
let timeLeft = 25 * 60;
let running = false;
let sessions = 0;

function initializeTimer() {

    document.getElementById("startTimer").addEventListener("click", startTimer);
    document.getElementById("pauseTimer").addEventListener("click", pauseTimer);
    document.getElementById("resetTimer").addEventListener("click", resetTimer);

    updateTimerDisplay();

}

function startTimer() {

    if (running) return;

    running = true;

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timer);

            running = false;

            sessions++;

            document.getElementById("sessionCount").textContent =
                "Sessions Completed: " + sessions;

            showToast("🎉 Study session completed!", "#10b981");

            timeLeft = 25 * 60;

            updateTimerDisplay();

        }

    }, 1000);

}

function pauseTimer() {

    running = false;

    clearInterval(timer);

}

function resetTimer() {

    running = false;

    clearInterval(timer);

    timeLeft = 25 * 60;

    updateTimerDisplay();

}

function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timerDisplay").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}