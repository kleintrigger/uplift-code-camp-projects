const TMDB_API_KEY = "d348a31ea6e519c60c77c842047ba473";

const chatMessages = document.getElementById("chat-messages");
const guessInput = document.getElementById("guess-input");
const sendButton = document.getElementById("send-button");
const nextMovieBtn = document.getElementById("next-movie");
const scoreDiv = document.getElementById("score");

const modal = document.getElementById("instructions-modal");
const startButton = document.getElementById("start-game");
const closeModalBtn = document.getElementById("close-modal");
const howToPlayBtn = document.getElementById("how-to-play");

const LEVELS = [
  { level: 1, movies: 10, required: 5 },
  { level: 2, movies: 20, required: 10 },
  { level: 3, movies: 30, required: 15 },
  { level: 4, movies: 40, required: 20 },
  { level: 5, movies: 50, required: 25 },
];

let currentLevelIndex = 0;
let currentLevel = LEVELS[currentLevelIndex];

let currentMovie = null;
let nextMovie = null;
let isPreloading = false;

let hintStage = 0;
let hintIndex = 0;
let score = 0;
let guesses = 0;
let moviesPlayed = 0;
let genreMap = {};


function appendMessageWithPoster(text, type = "system", posterPath = null) {
  const div = document.createElement("div");
  div.classList.add("message", type);

  const p = document.createElement("p");
  p.textContent = text;
  div.appendChild(p);

  if (posterPath) {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w300${posterPath}`;
    img.style.marginTop = "0.5rem";
    img.style.borderRadius = "10px";
    div.appendChild(img);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}



async function fetchGenres() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await res.json();
    genreMap = {};
    data.genres.forEach((g) => (genreMap[g.id] = g.name));
  } catch {
    genreMap = {};
  }
}



async function fetchMovieFromAPI() {
  const page = Math.floor(Math.random() * 5) + 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
  );

  if (!res.ok) throw new Error("Movie fetch failed");

  const data = await res.json();
  if (!data.results || !data.results.length)
    throw new Error("No movies returned");

  return data.results[Math.floor(Math.random() * data.results.length)];
}

async function preloadNextMovie() {
  if (isPreloading || nextMovie) return;

  isPreloading = true;
  try {
    nextMovie = await fetchMovieFromAPI();
  } catch (err) {
    console.warn("Preload failed", err);
  } finally {
    isPreloading = false;
  }
}



function checkLevelCompletion() {
  if (moviesPlayed >= currentLevel.movies) {
    appendMessageWithPoster(
      `🎮 Level ${currentLevel.level} completed! Score: ${score}/${currentLevel.movies}`,
      "system"
    );

    const btn = document.createElement("button");
    btn.style.marginTop = "10px";

    if (score >= currentLevel.required && currentLevelIndex < LEVELS.length - 1) {
      btn.textContent = "Next Level";
      btn.onclick = () => {
        currentLevelIndex++;
        currentLevel = LEVELS[currentLevelIndex];
        resetLevel();
      };
    } else {
      btn.textContent = "Restart Level";
      btn.onclick = resetLevel;
    }

    chatMessages.appendChild(btn);
    return true;
  }
  return false;
}

function resetLevel() {
  moviesPlayed = 0;
  score = 0;
  scoreDiv.textContent = `Score: ${score}`;
  chatMessages.innerHTML = "";
  currentMovie = null;
  nextMovie = null;

  appendMessageWithPoster(
    `🎬 Level ${currentLevel.level} started!\nYou need to guess at least ${currentLevel.required} movies correctly to proceed.`,
    "system"
  );

  fetchRandomMovie();
  preloadNextMovie();
}
async function fetchRandomMovie() {
  if (currentMovie) return;
  if (checkLevelCompletion()) return;

  if (!nextMovie) {
    appendMessageWithPoster("Loading next movie...", "system");
    try {
      nextMovie = await fetchMovieFromAPI();
    } catch {
      appendMessageWithPoster("⚠️ Could not load movie.", "system");
      return;
    }
  }

  currentMovie = nextMovie;
  nextMovie = null;

  hintStage = 0;
  hintIndex = 0;
  guesses = 0;

  appendMessageWithPoster(
    `🎬 New movie! (${moviesPlayed + 1}/${currentLevel.movies}), you have 5 attempts to guess correctly`,
    "system"
  );

  giveHint();
  preloadNextMovie();
}


function giveHint() {
  if (!currentMovie) return;

  let hint = "";

  if (hintStage < 4 && currentMovie.overview) {
    const words = currentMovie.overview.split(" ");
    hintIndex = Math.min(hintIndex + 5, words.length);
    hint = `Hint ${hintStage + 1}: ${words
      .slice(0, hintIndex)
      .join(" ")}...`;
  } else if (hintStage === 4) {
    const year = currentMovie.release_date?.slice(0, 4) || "Unknown";
    const genres =
      currentMovie.genre_ids
        ?.map((id) => genreMap[id] || "Unknown")
        .join(", ") || "Unknown";
    hint = `Hint 5: Released in ${year}, Genres: ${genres}`;
  } else {
    hint = "No more hints!";
  }

  appendMessageWithPoster(hint, "system");
  hintStage++;
}



function isGuessCorrect(guess, title) {
  const g = guess.toLowerCase().split(/\s+/);
  const t = title.toLowerCase().split(/\s+/);
  return g.filter((w) => t.includes(w)).length >= (t.length === 1 ? 1 : 2);
}

sendButton.onclick = () => {
  const guess = guessInput.value.trim();
  if (!guess || !currentMovie) return;

  appendMessageWithPoster(guess, "user");
  guessInput.value = "";
  guesses++;

  if (isGuessCorrect(guess, currentMovie.title)) {
    appendMessageWithPoster(
      `✅ Correct! "${currentMovie.title}"`,
      "system",
      currentMovie.poster_path
    );
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    currentMovie = null;
    moviesPlayed++;
    setTimeout(fetchRandomMovie, 1500);
  } else if (guesses >= 5) {
    appendMessageWithPoster(
      `❌ Out of guesses! "${currentMovie.title}"`,
      "system",
      currentMovie.poster_path
    );
    currentMovie = null;
    moviesPlayed++;
    setTimeout(fetchRandomMovie, 1500);
  } else {
    appendMessageWithPoster("❌ Wrong! Try again.", "system");
    giveHint();
  }
};

nextMovieBtn.onclick = () => {
  if (!currentMovie) return;

  appendMessageWithPoster(
    `⏭ Skipped! The correct answer is: "${currentMovie.title}"`,
    "system",
    currentMovie.poster_path
  );
  currentMovie = null;
  moviesPlayed++;
  setTimeout(fetchRandomMovie, 1500);
};


howToPlayBtn.onclick = () => (modal.style.display = "block");
closeModalBtn.onclick = () => (modal.style.display = "none");
startButton.onclick = () => {
  modal.style.display = "none";
  initGame();
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};


function initGame() {


  fetchGenres(); // background
  resetLevel();
}