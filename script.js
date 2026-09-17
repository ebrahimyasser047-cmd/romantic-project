/* =========================
   PASSWORD
========================= */

const passwordScreen = document.getElementById("passwordScreen");

const mainContent = document.getElementById("mainContent");

const passwordInput = document.getElementById("password");

const unlockBtn = document.getElementById("unlockBtn");

const passwordMessage = document.getElementById("passwordMessage");

// 🔐 غير كلمة السر من هنا
const SECRET_PASSWORD = "love";

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    unlock();
  }
});

function unlock() {
  const enteredPassword = passwordInput.value.trim().toLowerCase();

  if (enteredPassword === SECRET_PASSWORD) {
    passwordMessage.textContent = "❤️ Welcome ❤️";

    passwordScreen.style.opacity = "0";

    passwordScreen.style.transition = "opacity .8s ease";

    setTimeout(function () {
      passwordScreen.style.display = "none";

      mainContent.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      // Start music after user interaction
      playMusic();
    }, 800);
  } else {
    passwordMessage.textContent = "❌ كلمة السر غلط... جربي تاني ❤️";

    passwordInput.value = "";

    passwordInput.focus();
  }
}

/* =========================
   SCROLL TO STORY
========================= */

function scrollToStory() {
  document.querySelector(".story").scrollIntoView({
    behavior: "smooth",
  });
}

/* =========================
   MUSIC PLAYER
========================= */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

let isPlaying = false;

playBtn.addEventListener("click", function () {
  if (isPlaying) {
    audio.pause();
  } else {
    playMusic();
  }
});

function playMusic() {
  audio
    .play()
    .then(function () {
      isPlaying = true;

      playBtn.textContent = "⏸";
    })
    .catch(function () {
      console.log("Browser blocked autoplay.");
    });
}

audio.addEventListener("pause", function () {
  isPlaying = false;

  playBtn.textContent = "▶";
});

audio.addEventListener("play", function () {
  isPlaying = true;

  playBtn.textContent = "⏸";
});

/* =========================
   MUSIC PROGRESS
========================= */

audio.addEventListener("loadedmetadata", function () {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  progress.value = percent;

  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", function () {
  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

/* =========================
   NEXT / PREVIOUS
========================= */

document.getElementById("nextBtn").addEventListener("click", function () {
  audio.currentTime = 0;

  playMusic();
});

document.getElementById("prevBtn").addEventListener("click", function () {
  audio.currentTime = 0;
});

/* =========================
   LIKE BUTTON
========================= */

document.getElementById("likeBtn").addEventListener("click", function () {
  this.textContent = this.textContent === "❤️" ? "💖" : "❤️";
});

/* =========================
   FLOATING HEARTS
========================= */

const heartsContainer = document.querySelector(".hearts-container");

const heartTypes = ["❤️", "💕", "💗", "💖", "💓", "🌸"];

function createHeart() {
  const heart = document.createElement("div");

  heart.classList.add("floating-heart");

  heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];

  heart.style.left = Math.random() * 100 + "%";

  const size = Math.random() * 20 + 12;

  heart.style.fontSize = size + "px";

  const duration = Math.random() * 6 + 5;

  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, duration * 1000);
}

// Create hearts continuously
setInterval(createHeart, 450);

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealElements.forEach(function (element) {
  observer.observe(element);
});

/* =========================
   LOVE COUNTER
========================= */

// ❤️ غير التاريخ ده بتاريخ بداية علاقتكم
const startDate = new Date("2025-08-26T00:00:00");

function updateCounter() {
  const now = new Date();

  let difference = now - startDate;

  if (difference < 0) {
    difference = 0;
  }

  const seconds = Math.floor(difference / 1000);

  const days = Math.floor(seconds / 86400);

  const hours = Math.floor((seconds % 86400) / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const remainingSeconds = seconds % 60;

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent = hours;

  document.getElementById("minutes").textContent = minutes;

  document.getElementById("seconds").textContent = remainingSeconds;
}

updateCounter();

setInterval(updateCounter, 1000);
