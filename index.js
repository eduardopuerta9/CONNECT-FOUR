const board = document.querySelector('#board')
const modalContainer = document.querySelector('#modal-container')
const modalMessage = document.querySelector('#modal-message')
const resetButton = document.querySelector('#reset')
resetButton.onclick = () => {
  location.reload()
}
const redTurn = 1
const yellowTurn = 2
const pieces = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
let playerTurn = redTurn
let hoverColumn = -1
for (let i = 0; i < 42; i++) {
  let cell = document.createElement('div')
  cell.className = 'cell'
  board.appendChild(cell)

  cell.onmouseenter = () => {
    onMouseEnteredColumn(i % 7)
  }
  cell.onclick = () => {
    onColumnClicked(i % 7)
  }
}

function onColumnClicked(column) {
  let availableRow = pieces
    .filter((_, index) => index % 7 === column)
    .lastIndexOf(0)
  if (availableRow === -1) {
    return
  }
  pieces[availableRow * 7 + column] = playerTurn
  let cell = board.children[availableRow * 7 + column]
  let piece = document.createElement('div')
  piece.className = 'piece'
  piece.dataset.placed = true
  piece.dataset.player = playerTurn
  cell.appendChild(piece)

  let unPlacedPiece = document.querySelector("[data-placed='false']")
  let unPlacedY = unPlacedPiece.getBoundingClientRect().y
  let placedY = piece.getBoundingClientRect().y
  let yDiff = unPlacedY - placedY

  piece.animate(
    [
      { transform: `translateY(${yDiff}px)`, offset: 0 },
      { transform: `translateY(0px)`, offset: 1 }
    ],
    {
      duration: 400,
      easing: 'linear',
      iterations: 1
    }
  )

  //function checkGameWinOrDraw() {
  //if (!pieces.includes(0)) {
  // modalContainer.style.display = 'block'
  // modalMessage.textContent = 'Draw'
  // }
  //// if (hasPlayerWon(playerTurn, pieces)) modalContainer.style.display = 'block'
  // modalMessage.textContent = `${
  //   playerTurn === redTurn ? 'Red' : 'Yellow'
  // } WON!`
  // modalMessage.dataset.winner = playerTurn
  if (playerTurn === redTurn) {
    playerTurn = yellowTurn
  } else {
    playerTurn = redTurn
  }
  updateHover()
}

function updateHover() {
  let unPlacedPiece = document.querySelector("[data-placed='false']")
  if (unPlacedPiece) {
    unPlacedPiece.parentElement.removeChild(unPlacedPiece)
  }
  if (pieces[hoverColumn] === 0) {
    let cell = board.children[hoverColumn]
    let piece = document.createElement('div')
    piece.className = 'piece'
    piece.dataset.placed = false
    piece.dataset.player = playerTurn
    cell.appendChild(piece)
  }
}

function onMouseEnteredColumn(column) {
  hoverColumn = column
  updateHover()
}
function hasPlayerWon(playerTurn, pieces) {
  for (let index = 0; index < 42; index++) {
    if (
      index % 7 < 4 &&
      pieces[index] === playerTurn &&
      pieces[index + 1] === playerTurn &&
      pieces[index + 2] === playerTurn &&
      pieces[index + 3] === playerTurn
    ) {
      return true
    }
    if (
      index < 21 &&
      pieces[index] === playerTurn &&
      pieces[index + 7] === playerTurn &&
      pieces[index + 14] === playerTurn &&
      pieces[index + 21] === playerTurn
    ) {
      return true
    }
    if (
      index % 7 < 4 &&
      index < 18 &&
      pieces[index] === playerTurn &&
      pieces[index + 8] === playerTurn &&
      pieces[index + 16] === playerTurn &&
      pieces[index + 24] === playerTurn
    ) {
      return true
    }
    if (
      index % 7 >= 3 &&
      index < 21 &&
      pieces[index] === playerTurn &&
      pieces[index + 6] === playerTurn &&
      pieces[index + 12] === playerTurn &&
      pieces[index + 18] === playerTurn
    ) {
      return true
    }
  }
  return false
}
