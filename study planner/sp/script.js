const quotes = [
    "✨ Believe in yourself! You can do it! ✨",
    "🚀 Push harder than yesterday if you want a different tomorrow.",
    "🌟 Every expert was once a beginner.",
    "🔥 Stay focused and never give up!",
    "💡 Success is the sum of small efforts, repeated day-in and day-out."
];

let totalSeconds = 0;
let countdownInterval;
let isPaused = false;

// Screen Transitions
function goToQuotes() {
    switchScreen('welcomeScreen', 'quotesScreen');
    showRandomQuote();
}

function goToPlanner() {
    switchScreen('quotesScreen', 'plannerScreen');
}

function switchScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
}

// Random Quote Generator
function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').innerText = randomQuote;
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleBtn = document.querySelector('.toggle-btn');
    toggleBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Convert hh:mm:ss to seconds
function timeToSeconds(timeStr) {
    const [hh, mm, ss] = timeStr.split(':').map(Number);
    return (hh * 3600) + (mm * 60) + ss;
}

// Start Planner Logic
function startPlanner() {
    const timeStr = document.getElementById('timeInput').value;
    const tasks = document.getElementById('taskInput').value.split(',').map(t => t.trim()).filter(Boolean);

    if (tasks.length === 0 || tasks.length > 5) {
        alert("Add 1-5 tasks only.");
        return;
    }

    if (!/^\d{1,2}:\d{2}:\d{2}$/.test(timeStr)) {
        alert("Enter time as hh:mm:ss (e.g., 01:30:00)");
        return;
    }

    totalSeconds = timeToSeconds(timeStr);
    if (totalSeconds <= 0) {
        alert("Time should be greater than 0");
        return;
    }

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });

    startCountdown();
    document.getElementById('controls').style.display = "flex";
}

// Countdown
function startCountdown() {
    const countdown = document.getElementById('countdown');
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        if (!isPaused) {
            let hrs = Math.floor(totalSeconds / 3600);
            let mins = Math.floor((totalSeconds % 3600) / 60);
            let secs = totalSeconds % 60;
            countdown.innerText = `⏳ ${hrs}h ${mins}m ${secs}s left`;

            if (totalSeconds === 900) {
                showPopup();
            }

            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                showCongrats();
            } else {
                totalSeconds--;
            }
        }
    }, 1000);
}

// Pause/Resume Button
function pauseResumeTimer() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').innerText = isPaused ? "▶️ Resume" : "⏸️ Pause";
}

// Cancel Button
function cancelTasks() {
    clearInterval(countdownInterval);
    resetPlanner();
}

// Reminder Popup
function showPopup() {
    document.getElementById('reminderPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('reminderPopup').style.display = 'none';
}

function extendTime() {
    totalSeconds += 900;
    closePopup();
}

// Congrats Popup
function showCongrats() {
    document.getElementById('congratsPopup').style.display = 'block';
}

// Reset Everything
function resetPlanner() {
    totalSeconds = 0;
    isPaused = false;
    document.getElementById('pauseBtn').innerText = "⏸️ Pause";
    document.getElementById('countdown').innerText = '';
    document.getElementById('taskInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('taskList').innerHTML = '';
    document.getElementById('controls').style.display = "none";
    document.getElementById('reminderPopup').style.display = 'none';
    document.getElementById('congratsPopup').style.display = 'none';
    switchScreen('plannerScreen', 'welcomeScreen');
}