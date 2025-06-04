let countdownInterval;
let startTime;

document.getElementById('themeSwitcher').addEventListener('change', function () {
  document.body.classList.toggle('dark');
});

function startCountdown() {
  const eventName = document.getElementById("eventName").value || "Event";
  const targetDate = new Date(document.getElementById("targetDate").value);

  if (isNaN(targetDate)) {
    alert("Please select a valid date and time.");
    return;
  }

  document.getElementById("eventTitle").innerText = eventName;
  clearInterval(countdownInterval);
  startTime = new Date(); // Save the time countdown started

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;
    const totalDuration = targetDate - startTime;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("timeDisplay").innerHTML = "🎉 It's time for " + eventName + "!";
      document.getElementById("progressBar").style.width = "100%";
      document.getElementById("alarm").play();
      confetti(); // Trigger animation
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    const progress = ((now - startTime) / totalDuration) * 100;
    document.getElementById("progressBar").style.width = `${progress}%`;
  }, 1000);
}

// OPTIONAL: Confetti library (you can use https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js)
function confetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
