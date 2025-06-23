document.addEventListener('DOMContentLoaded', () => {
    // recupera o nome do jogador do localStorage e exibe
    const playerName = localStorage.getItem('player');
    if (playerName) {
        document.getElementById('playerName').textContent = playerName;
    } else {
        // se por algum motivo o nome não estiver lá, redireciona de volta para o login
        window.location.href = 'index.html';
        return;
    }

    // seleciona os elementos html necessários
    const themeCards = document.querySelectorAll('.theme-card');
    const levelButtons = document.querySelectorAll('.level-button');
    const startGameButton = document.querySelector('.start-game-button');

    // variáveis para armazenar a seleção atual do usuário
    let selectedTheme = null;
    let selectedLevel = null;

    // função para verificar se o botão "iniciar jogo" deve ser habilitado
    const checkStartButtonStatus = () => {
        if (selectedTheme && selectedLevel) {
            startGameButton.removeAttribute('disabled');
        } else {
            startGameButton.setAttribute('disabled', '');
        }
    };

    // lógica para seleção de temas
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            // remove a classe 'selected' de todos os cards
            themeCards.forEach(c => c.classList.remove('selected'));
            // adiciona a classe 'selected' ao card clicado
            card.classList.add('selected');
            // armazena o tema selecionado
            selectedTheme = card.dataset.theme;
            // verifica o status do botão iniciar jogo
            checkStartButtonStatus();
        });
    });

    // lógica para seleção de níveis
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // remove a classe 'selected' de todos os botões de nível
            levelButtons.forEach(b => b.classList.remove('selected'));
            // adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');
            // armazena o nível selecionado
            selectedLevel = button.dataset.level;
            // verifica o status do botão iniciar jogo
            checkStartButtonStatus();
        });
    });

    // lógica para o botão "iniciar jogo"
    startGameButton.addEventListener('click', () => {
        if (selectedTheme && selectedLevel) {
            // salva as escolhas no localStorage para a página do jogo
            localStorage.setItem('gameTheme', selectedTheme);
            localStorage.setItem('gameLevel', selectedLevel);

            // redireciona para a página do jogo
            window.location.href = '/pages/game.html';
        } else {
            alert('por favor, selecione um tema e um nível para começar!');
        }
    });
});