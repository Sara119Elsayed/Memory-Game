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
