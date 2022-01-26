'use strict'
var PACMAN_IMG = `<img class="img-mode pacman-r" src="images/pacman.gif" />`

var gPacman;
var killedGhosts = []
var idx = -1

var dir ; //diraction class of img (getNextLocation)

var emptyLocations = [];
var currPosPacman = {i: 4, j: 6}

var powerSound = new Audio('sound/power.wav');
var moveSound = new Audio('sound/move.wav')

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 3
        },
        isSuper: false,
        
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN_IMG;
}

function movePacman(ev) {
    if(ev.code === 'Space' && !gGame.isOn) init()
    if (!gGame.isOn ) return

    moveSound.play()
    
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    currPosPacman = nextLocation
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    //diraction of pacman
    
    PACMAN_IMG = `<img class="img-mode pacman-${dir}" src="images/pacman.gif" />` // curr heading

    if (nextCell === WALL_IMG) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST_IMG) {
        if(gPacman.isSuper) {
            for(var i = 0; i < gGhosts.length; i++){
                if(gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                        killedGhosts.push(...gGhosts.splice(i, 1))
                    }
            }
            if(killedGhosts.currCellContent === FOOD_IMG) updateScore(1)
        }
        else {
          gameOver();
        document.querySelector('.msg').innerText = 'Game Over \n Click "space" to play again'
        return  
        }
    }
    if(nextCell === CHERRY_IMG){
        powerSound.play()
        gGame.cherry += 10
    } 

    if(killedGhosts[0] && !gPacman.isSuper) {
        for(var i = 0; i < killedGhosts.length; i++) {
            gGhosts.push(killedGhosts[i])

        }
        killedGhosts = []
    }
  
    if (nextCell === FOOD_IMG) {
        updateScore(1)
        emptyLocations.push(nextLocation)

    }
    if(nextCell === POWER_IMG) {
        if(gPacman.isSuper) return
        powerSound.play()
        gPacman.isSuper = true
        setTimeout(()=> {
            gPacman.isSuper = false;
        }, 7000)
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
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    console.log(currPosPacman);

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