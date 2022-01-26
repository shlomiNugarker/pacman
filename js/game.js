'use strict'

const FOOD_IMG = `<img class="img-mode food" src="images/food.png" />`;
const EMPTY = ' ';

const CHERRY_IMG = `<img class="img-mode cherry" src="images/cherry.gif" />`;
const WALL_IMG = `<img class="img-mode" src="images/wall.png" />`;
const POWER_IMG = `<img class="img-mode" src="images/apple.png" />`

var intervalCherry;




var gBoard;
var gGame = {
    score: 0,
    cherry: 0,
    amountOffood: -1,
    isOn: false
}

function init() {
    document.querySelector('.msg').innerText = ''
    document.querySelector('.restart').style.display = 'none';
    gGame.score = 0;
    gGame.cherry = 0;

   
    gBoard = buildBoard(15,5)
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true

    addCherry(gBoard, emptyLocations)
}

function buildBoard(size, addWidth = 4) {
    var board = [];
    // var addWidth = 5
    var middlePos = Math.floor(size/2)
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; (j < size + addWidth); j++) {
            board[i][j] = FOOD_IMG;
            gGame.amountOffood++;
            if((i ===1 && j === 1) || (i === 1 && (j === size-2+addWidth))
            || (j === 1 && i === size-2) || (i === size-2 && (j === size-2+addWidth))) {
               board[i][j] = POWER_IMG 
               gGame.amountOffood--;
            } 
            if (j === 0 || j === (size - 1 + addWidth) ||
                i === 0 || i=== size - 1 || (j === middlePos-1 && i > middlePos+1) || (j === middlePos + 2 && i < 3) ) {
                board[i][j] = WALL_IMG;
                gGame.amountOffood--;
                
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.sumScore = gGame.score + gGame.cherry
    gGame.score += diff;
    gGame.amountOffood--;
    document.querySelector('.score3').innerText = gGame.sumScore;
    if(gGame.amountOffood === 0) {
        gameOver()
        document.querySelector('.msg').innerText = 'Victory !\n click "space" to play again.'
    }
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(intervalCherry)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    document.querySelector('.restart').style.display = 'block';
    document.querySelector('.msg').style.display = 'block'
    document.querySelector('.msg').innerText = 'Game Over !\n click "space" to play again.'
}


function addCherry(gBoard, emptyLocations) {
    intervalCherry = setInterval(() => {
        if(emptyLocations.length === 0) return;
        var randEmpty = getRandomIntInclusive(0, emptyLocations.length-1)
        
       
        var randCell = emptyLocations[randEmpty]
        // emptyLocations.splice(randEmpty, 1)
        if((randCell === PACMAN_IMG)  || (randCell.i === currPosPacman.i && randCell.j === currPosPacman.j) || randCell === gPacman.location) return;
        gBoard[randCell.i][randCell.j] = CHERRY_IMG

        renderCell(randCell, CHERRY_IMG)
   
    }, 15000);
    
}