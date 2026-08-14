const images = [
    'images/1.gif',
    'images/2.gif',
    'images/3.gif',
    'images/4.gif',
    'images/5.gif',
    'images/6.gif'
];

const board = document.querySelector('.game-board');
const movesElement = document.getElementById('moves');
const pairsElement = document.getElementById('pairs');
const restartButton = document.getElementById('restart-btn');

let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;


function shuffleCards() {
    const allCards = [...images, ...images].sort(() => Math.random() - 0.5);
    return allCards;
}

function updateStats() {
    movesElement.textContent = moves;
    pairsElement.textContent = `${matchedPairs} / ${images.length}`;
}

function finishMatch() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard = null;
    secondCard = null;
    matchedPairs += 1;
    updateStats();

    if (matchedPairs === images.length) {
        setTimeout(() => {
            alert('Excellent! You matched all cards!');
        }, 300);
    }
}

function resetTurn() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }, 800);
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched') || this.classList.contains('is-flipped')) {
        return;
    }

    this.classList.add('is-flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves += 1;
    updateStats();

    if (firstCard.dataset.card === secondCard.dataset.card) {
        finishMatch();
    } else {
        resetTurn();
    }
}

function buildBoard() {
    deck = shuffleCards();
    board.innerHTML = '';

    deck.forEach((cardImage, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'memory-card';
        card.dataset.card = cardImage;
        card.setAttribute('aria-label', `Memory Card ${index + 1}`);

        const frontFace = document.createElement('img');
        frontFace.className = 'card-face front-face';
        frontFace.src = cardImage;
        frontFace.alt = 'Hidden card';

        const backFace = document.createElement('img');
        backFace.className = 'card-face back-face';
        backFace.src = 'images/Moon.gif';
        backFace.alt = 'Card back';

        card.appendChild(frontFace);
        card.appendChild(backFace);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function restartGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;
    updateStats();
    buildBoard();
}

restartButton.addEventListener('click', restartGame);

updateStats();
buildBoard();
