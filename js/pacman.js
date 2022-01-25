'use strict'
var PACMAN_IMG = `<img class="img-mode pacman-r" src="images/pacman.gif" />`

var gPacman;
var killedGhosts = []
var idx = -1

var dir ;

var emptyLocations = [];
var currPosPacman;

var powerSound = new Audio('sound/power.wav')

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN_IMG;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    currPosPacman = nextLocation
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    //diraction of pacman
    
    PACMAN_IMG = `<img class="img-mode pacman-${dir}" src="images/pacman.gif" />`

    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL_IMG) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if(gPacman.isSuper) {
            for(var i = 0; i < gGhosts.length; i++){
                if(gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                        killedGhosts.push(...gGhosts.splice(i, 1))
                    }
            }
            if(killedGhosts.currCellContent === FOOD) updateScore(1)
        }
        else {
          gameOver();
        document.querySelector('.msg').innerText = 'Game Over'
        return  
        }
    }
    if(nextCell === CHERRY){
        gGame.cherry += 10
        document.querySelector('.score2').innerText = gGame.cherry
    } 

    if(killedGhosts[0] && !gPacman.isSuper) {
        for(var i = 0; i < killedGhosts.length; i++) {
            gGhosts.push(killedGhosts[i])

        }
        killedGhosts = []
    }
  

  

    if (nextCell === FOOD) {
        updateScore(1)
        emptyLocations.push(nextLocation)
        // console.log(emptyLocations);
        // console.log(gGame.sumScore);
    }
    if(nextCell === POWER_IMG) {
        if(gPacman.isSuper) return
        powerSound.play()
        updateScore(1)
        gPacman.isSuper = true
        setTimeout(()=> {
            gPacman.isSuper = false;
        }, 5000)
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN_IMG
    // update the DOM
    renderCell(gPacman.location, PACMAN_IMG)
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            dir = 'u'
            break;
        case 'ArrowDown':
            nextLocation.i++
            dir = 'd'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            dir = 'l'
            break;
        case 'ArrowRight':
            nextLocation.j++
            dir = 'r';
            break;
        default: return null
    }
    return nextLocation;
}