'use strict'
// const WALL = '🛑'
const FOOD = '.'
const EMPTY = ' ';
// const POEWR = '🍉';
const CHERRY = '🍒';
const WALL_IMG = `<img class="img-mode" src="images/wall.png" />`;
const POWER_IMG = `<img class="img-mode" src="images/apple.png" />`

var intervalCherry;

// var anountOffood = 0;




var gBoard;
var gGame = {
    score: 0,
    cherry: 0,
    sumScore: 0 ,
    isOn: false
}

function init() {
    document.querySelector('.msg').innerText = ''
    document.querySelector('.restart').style.display = 'none';
    gGame.score = 0;
    gGame.cherry = 0;
    // gGame.sumScore = 0
    document.querySelector('.score').innerText = 0;


    // console.log('Hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true

    addCherry(gBoard, emptyLocations)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if((i ===1 && j === 1) || (i === 1 && j === SIZE-2)
            || (j === 1 && i === SIZE-2) || (i === SIZE-2 && j === SIZE-2)) board[i][j] = POWER_IMG
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL_IMG;
                
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.sumScore = gGame.score + gGame.cherry
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if(gGame.score === 60) {
        gameOver()
        document.querySelector('.msg').innerText = 'Victory !'
    }
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(intervalCherry)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    document.querySelector('.restart').style.display = 'block';
}


function addCherry(gBoard, emptyLocations) {
    intervalCherry = setInterval(() => {
        if(emptyLocations.length === 0) return;
        var randEmpty = getRandomIntInclusive(0, emptyLocations.length-1)
        
       
        var randCell = emptyLocations[randEmpty]
        // emptyLocations.splice(randEmpty, 1)
        if((randCell === PACMAN_IMG)  || (randCell === currPosPacman) || randCell === gPacman.location) return;
        gBoard[randCell.i][randCell.j] = CHERRY

        renderCell(randCell, CHERRY)
        console.log(randCell);
     
   
    }, 15000);
    
}