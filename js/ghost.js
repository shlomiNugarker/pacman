'use strict'
const GHOST = '&#9781;';

var gNum = 1
var gGhosts;
var gIntervalGhosts;
var randColor;



function createGhost(board, idx) {
   
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        idImg: idx + 1
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }

    gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
    // console.table(gBoard)
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

// function randomPolicy(ghost) {
//     var moveDiff = getMoveDiff()
    
//     var nextLocation = {
//         i: ghost.location.i + moveDiff.i,
//         j: ghost.location.j + moveDiff.j,
//     }
//     return nextLocation;
// }

function moveGhost(ghost, policyFunc) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    // var nextLocation = policyFunc(ghost) 


    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL_IMG) return
    if (nextCell === GHOST) return
    if (nextCell === CHERRY) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN_IMG) {
        if(gPacman.isSuper) {
            return
        }
        else {
            gameOver();
            return
        }
        
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM

    renderCell(ghost.location, getGhostHTML(ghost, gPacman.isSuper))
}

function getGhostHTML(ghost, isSuper) {
    if(isSuper) {
        return `<span style="color: red;"><img class="img-mode" src="images/ghost.png" /></span>`
    }
    else {
        return `<span style="color:${ghost.color} ;"><img class="img-mode" src="images/g${ghost.idImg}.png" /></span>`
    }
    
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

