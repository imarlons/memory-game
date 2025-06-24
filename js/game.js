// js/game.js

import { levelConfigs } from './configs/levels.js';
import { themeConfigs } from './configs/themes.js';

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const resetButton = document.querySelector('.reset-btn');

let firstCard = '';
let secondCard = '';
let loop;

let gameTheme = '';
let gameLevel = '';
let totalCardsInGame = 0;

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === totalCardsInGame) {
        clearInterval(loop);
        setTimeout(() => {
            alert(`PARABÉNS, ${spanPlayer.innerHTML}! Você completou o nível ${gameLevel} do tema ${gameTheme}! Tempo: ${timer.innerHTML} segundos!`);
        }, 500);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.classList.contains('reveal-card') || target.parentNode.firstChild.classList.contains('disabled-card')) {
        return;
    }
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
};

const createCard = (character, themePath) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('${themePath}/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card;
};

const loadGame = () => {
    const levelConfig = levelConfigs[gameLevel];
    const themeConfig = themeConfigs[gameTheme];

    totalCardsInGame = levelConfig.cardCount;
    const charactersToUse = themeConfig.characters.slice(0, levelConfig.pairs);
    const duplicateCharacters = [...charactersToUse, ...charactersToUse];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${levelConfig.columns}, 1fr)`;

    shuffledArray.forEach((character) => {
        const card = createCard(character, themeConfig.imagePath);
        grid.appendChild(card);
    });
};

const resetGame = () => {
    clearInterval(loop);
    timer.innerHTML = '0';
    grid.innerHTML = '';
    firstCard = '';
    secondCard = '';
    loadGame();
    startTimer();
};

window.onload = () => {
    const playerName = localStorage.getItem('player');
    gameTheme = localStorage.getItem('gameTheme');
    gameLevel = localStorage.getItem('gameLevel');

    if (!playerName || !gameTheme || !gameLevel) {
        alert('As informações do jogador, tema ou nível não foram encontradas. Redirecionando para a seleção.');
        window.location.href = 'selecao-temas-niveis.html';
        return;
    }

    spanPlayer.innerHTML = playerName;
    loadGame();
    startTimer();

    resetButton.addEventListener('click', resetGame);
};