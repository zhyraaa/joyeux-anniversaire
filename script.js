// 1. Inisialisasi Partikel Hati Melayang
for (let i = 0; i < 25; i++) {
  const heart = document.createElement('div');
  heart.className = 'bg-heart';
  heart.innerHTML = ['♥', '💖', '🌸', '✨'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (5 + Math.random() * 5) + 's';
  heart.style.animationDelay = (Math.random() * 5) + 's';
  document.body.appendChild(heart);
}

// 2. Fungsi Indikator Titik
function updateDots(stageNum) {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === stageNum - 1);
  });
}

// 3. Navigasi Antar Halaman / Stage
function nextStage(num) {
  document.querySelectorAll('.stage, .container').forEach(el => el.classList.remove('active'));
  const next = document.getElementById('stage' + num);
  if (next) {
    next.classList.add('active');
    updateDots(num);
  }
}

// 4. Navigasi ke Game Screen
function nextScreen(screenId) {
  document.querySelectorAll('.stage, .container').forEach(element => element.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (!screen) return;

  screen.classList.add('active');

  if (screenId === 'screen-game' && !gameInitialized) {
    initGame();
  }
}

// 5. Logika Game Memory
let gameInitialized = false;
const icons = ['❤️', '⭐', '✨', '🌸', '🧸', '🎀'];
let cards = [...icons, ...icons];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let lockBoard = false;

function initGame() {
  gameInitialized = true;
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  moves = 0;
  matchedCount = 0;
  document.getElementById('moves-count').innerText = moves;
  
  // Acak kartu
  cards.sort(() => Math.random() - 0.5);

  cards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = item;
    card.dataset.index = index;
    card.innerText = '?';
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.innerText = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('moves-count').innerText = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
    matchedCount += 2;
    
    if (matchedCount === cards.length) {
      document.getElementById('game-completed').style.display = 'block';
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerText = '?';
      card2.innerText = '?';
      flippedCards = [];
      lockBoard = false;
    }, 700);
  }
}

// 6. Interaksi Memotong Kue Ulang Tahun
function cutCake(val) {
  const cutLine = document.getElementById('cutLine');
  cutLine.style.opacity = val / 100;
  if (val >= 95) {
    document.getElementById('candleFlame').style.display = 'none';
    document.getElementById('cakeTitle').innerText = 'Yummy! Make a wish...';
    document.getElementById('cakeSubtitle').innerText = 'The candle has been blown out! ✨';
    document.getElementById('knifeRange').style.display = 'none';
    document.getElementById('knifeGuide').style.display = 'none';
    document.getElementById('cakeNextBtn').style.display = 'inline-block';
  }
}

// 7. Interaksi Balon Harapan (Wishes Bubble)
function popWish(bubble, message) {
  bubble.style.transform = 'scale(1.3)';
  bubble.style.opacity = '0';
  setTimeout(() => bubble.remove(), 250);
  document.getElementById('wishText').innerText = message;
}

// 8. Interaksi Buka Kotak Kado
function openGift() {
  const gift = document.querySelector('.gift-box');
  gift.style.transform = 'scale(1.2) rotate(10deg)';
  setTimeout(() => {
    gift.style.display = 'none';
    document.getElementById('giftMessage').style.display = 'block';
  }, 400);
}

// 9. Interaksi Buka Buku Diary
function unlockDiary() {
  const diaryBook = document.getElementById('diaryBook');
  const lockStatus = document.getElementById('lockStatus');
  
  lockStatus.innerHTML = '🔓 OPENED ✨';
  diaryBook.style.transform = 'rotateY(-40deg) scale(1.03)';
  diaryBook.style.opacity = '0.7';
  
  setTimeout(() => {
    diaryBook.style.display = 'none';
    document.getElementById('diarySubtitle').style.display = 'none';
    document.getElementById('letterSheet').style.display = 'block';
  }, 450);
}