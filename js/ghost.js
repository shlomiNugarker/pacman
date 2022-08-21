'use strict'
const GHOST_IMG = '<img class="img-mode" src="images/g1.png" />'

var gNum = 1
var gGhosts
var gIntervalGhosts
var randColor

function createGhost(board, idx, loc) {
  var ghost = {
    location: {
      i: loc.i,
      j: loc.j,
    },
    currCellContent: FOOD_IMG,
    color: getRandomColor(),
    idImg: idx + 1,
  }
  gGhosts.push(ghost)
  board[ghost.location.i][ghost.location.j] = GHOST_IMG
}

function createGhosts(board) {
  // 3 ghosts and an interval
  var loc = [
    {
      i: 2,
      j: 2,
    },
    {
      i: 8,
      j: 1,
    },
    {
      i: 10,
      j: 17,
    },
  ]
  gGhosts = []
  for (var i = 0; i < 3; i++) {
    createGhost(board, i, loc[i])
  }

  gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
  // console.table(gBoard)
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i]
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

function moveGhost(ghost) {
  // console.log('ghost.location', ghost.location)
  // figure out moveDiff, nextLocation, nextCell

  var moveDiff = getMoveDiff()
  var moveAttack = getAttackPac(gPacman.location, ghost.location)
  var isAttack = true
  //   var isAttack = !gPacman.isSuper
  isAttack
    ? getAttackPac(currPosPacman, ghost.location)
    : getMoveDiff(currPosPacman)
  var nextLocation = {
    i: ghost.location.i + moveAttack.i,
    j: ghost.location.j + moveAttack.j,
  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j]
  // console.log('nextCell', nextCell)
  // return if cannot move
  if (nextCell === WALL_IMG) return
  if (nextCell === GHOST_IMG) return
  if (nextCell === CHERRY_IMG) return
  // hitting a pacman?  call gameOver
  if (nextCell === PACMAN_IMG) {
    if (gPacman.isSuper) return
    else {
      gameOver()
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
    j: nextLocation.j,
  }
  ghost.currCellContent = nextCell
  gBoard[ghost.location.i][ghost.location.j] = GHOST_IMG
  // update the DOM

  renderCell(ghost.location, getGhostHTML(ghost, gPacman.isSuper))
}

function getGhostHTML(ghost, isSuper) {
  if (isSuper) {
    return `<span style="color: red;"><img class="img-mode" src="images/ghost.png" /></span>`
  } else {
    return `<span style="color:;"><img class="img-mode" src="images/g${ghost.idImg}.png" /></span>`
  }
}

function getMoveDiff(currPosPac) {
  var randNum = getRandomIntInclusive(1, 100)
  currPosPac = gPacman.location
  console.log(currPosPac)
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

function getAttackPac(pacPos, ghostPos) {
  console.log('getAttackPac')
  console.log(pacPos, ghostPos)
  var posToAttack = null

  //   if (gPacman.isSuper) {
  if (pacPos.j > ghostPos.j) posToAttack = { i: 0, j: 1 }
  if (pacPos.j === ghostPos.j && pacPos.i > ghostPos.i)
    posToAttack = { i: 1, j: 0 }
  if (ghostPos.j > pacPos.j) posToAttack = { i: 0, j: -1 }
  if (ghostPos.i > pacPos.i) posToAttack = { i: -1, j: 0 }
  //   }
  console.log({ posToAttack })
  return posToAttack
  // else
}
