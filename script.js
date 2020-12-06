let playerOneName,
    playerTwoName,
    playerWhoseTurnItIsName,
    startButton,
    board,
    startPage,
    gameBoardPage,
    winnerOverlay,
    x,
    o,    
    topLeft,
    topMiddle,
    topRight,
    middleLeft,
    middleMiddle,
    middleRight,
    bottomLeft,
    bottomMiddle,
    bottomRight;

function handleStartButton(){
    playerOneName = playerOneNameInput.value;
    playerTwoName = playerTwoNameInput.value;
    playerOneName && playerTwoName ? startButton.disabled = false : startButton.disabled = true;
}

function handleStartGame(){
    startPage.style.display = "none";
    gameBoardPage.style.display = "block";
    playerWhoseTurnItIsName.innerHTML = playerOneName;
    board = document.getElementsByClassName('board');

    Array.from(board).forEach(function(square) {
        square.addEventListener('click', handlePlayerClick);
    });
}

function handlePlayerClick(e){
    let validClick = true;
    for(c of e.target.classList){
        if(c === 'taken'){
            validClick = false;
        }
    }
    
    if(validClick){
        if(playerWhoseTurnItIsName.innerHTML === playerOneName){
            x = document.createElement("IMG");
            x.setAttribute('src', 'Images/cross-sign.svg');
            x.setAttribute('class', 'x-box taken');
            e.target.appendChild(x);
            e.target.classList.add('x');
        } else if (playerWhoseTurnItIsName.innerHTML === playerTwoName){
            o = document.createElement("IMG");
            o.setAttribute('src', 'Images/o.svg');
            o.setAttribute('class', 'o-box taken');
            e.target.appendChild(o);
            e.target.classList.add('o');
        }
        e.target.classList.add('taken');
        switchPlayer();
    }
    checkIfWinning();
}

function switchPlayer(){
    playerWhoseTurnItIsName.innerHTML = playerWhoseTurnItIsName.innerHTML === playerOneName ? playerTwoName : playerOneName;
}

function checkIfWinning(){
    topLeft = document.getElementById('top_left'),
    topMiddle = document.getElementById('top_middle'),
    topRight = document.getElementById('top_right'),
    middleLeft = document.getElementById('mid_left'),
    middleMiddle = document.getElementById('mid_middle'),
    middleRight = document.getElementById('mid_right'),
    bottomLeft = document.getElementById('bottom_left'),
    bottomMiddle = document.getElementById('bottom_middle'),
    bottomRight = document.getElementById('bottom_right');

    let arr = [topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight];

    if(checkBoard('x')){
        gameOver(playerOneName);
    } else if (checkBoard('o')){
        gameOver(playerTwoName);
    } else {
        let draw = true;
        arr.forEach(function(element){
            if(!element.classList.contains('taken')){
                draw = false;
            }
        });

        if(draw){
            gameOver(null)
        }
    }
}

function checkBoard(param){
    if((topLeft.classList.contains(param) && topMiddle.classList.contains(param) && topRight.classList.contains(param)) ||
        (middleLeft.classList.contains(param) && middleMiddle.classList.contains(param) && middleRight.classList.contains(param)) ||
        (bottomLeft.classList.contains(param) && bottomMiddle.classList.contains(param) && bottomRight.classList.contains(param)) ||
        (topLeft.classList.contains(param) && middleLeft.classList.contains(param) && bottomLeft.classList.contains(param)) ||
        (topMiddle.classList.contains(param) && middleMiddle.classList.contains(param) && bottomMiddle.classList.contains(param)) ||
        (topRight.classList.contains(param) && middleRight.classList.contains(param) && bottomRight.classList.contains(param)) ||
        (topLeft.classList.contains(param) && middleMiddle.classList.contains(param) && bottomRight.classList.contains(param)) ||
        (topRight.classList.contains(param) && middleMiddle.classList.contains(param) && bottomLeft.classList.contains(param))
        ){
        return true;
    }
}

function gameOver(winner){
    gameBoardPage.style.display = "none";
    winnerOverlay.style.display = "block";

    if(winner){
        document.getElementById('winner').style.display = "block";
        document.getElementById('winner').innerHTML = `${winner.toUpperCase()} WON!`
    } else {
        document.getElementById('draw').style.display = "block"; 
    }


    axios.post('report_winner.php', {
        winner: winner
    })
    .then(response =>{
        console.log(response);
    }).catch(error =>console.log(error));







    // let httpc= new XMLHttpRequest();
    // let url = "report_winner.php";
    // httpc.open("POST", url, true);
    // httpc.send(winner);

    // window.open("report_winner.php");


    document.getElementById('play_again_same_players').addEventListener('click', startNewGameSamePlayers);
    document.getElementById('play_again_new_players').addEventListener('click', startNewGameNewPlayers);

}

function startNewGameSamePlayers(){
    resetGameBoard();
    handleStartGame();
}

function startNewGameNewPlayers(){
    resetGameBoard();
    gameBoardPage.style.display = "none";
    winnerOverlay.style.display = "none";
    startPage.style.display = "block";

    playerOneNameInput.value = "";
    playerTwoNameInput.value = "";
}

function resetGameBoard(){
    let headers = document.getElementsByClassName('top_banner');
    Array.from(headers).forEach(function(header){
        header.style.display = "none";
    });
    gameBoardPage.style.display = "block";
    winnerOverlay.style.display = "none";

    board = document.getElementsByClassName('board');

    Array.from(board).forEach(function(square) {
        square.classList.remove('taken');
        square.classList.remove('x');
        square.classList.remove('o');
        if(square.firstChild){
            square.removeChild(square.firstChild);
        }
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    let playerOneNameInput = document.getElementById('playerOneNameInput'),
        playerTwoNameInput = document.getElementById('playerTwoNameInput');

    playerWhoseTurnItIsName = document.getElementById('players_turn_name');
    startButton = document.getElementById('start_button'),
    startPage = document.getElementById('start_page'),
    gameBoardPage = document.getElementById('game_board_page'),
    winnerOverlay = document.getElementById('winner_overlay');

    playerOneNameInput.addEventListener('keyup', handleStartButton);
    playerTwoNameInput.addEventListener('keyup', handleStartButton);
    startButton.addEventListener('click', handleStartGame);
});
