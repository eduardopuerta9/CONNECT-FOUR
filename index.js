const board = document.querySelector('#board')
const resetButton = document.querySelector('#reset')
resetButton.onclick = () => {
  location.reload()
}
const saturnTurn = 1
const earthTurn = 2
const cells = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
function hasPlayerWon(playerTurn, cells) {
  for (let index = 0; index < 42; index++) {
    if (
      index % 7 < 4 &&
      cells[index] === playerTurn &&
      cells[index + 1] === playerTurn &&
      cells[index + 2] === playerTurn &&
      cells[index + 3] === playerTurn
    ) {
      return true
    }
    if (
      index < 21 &&
      cells[index] === playerTurn &&
      cells[index + 7] === playerTurn &&
      cells[index + 14] === playerTurn &&
      cells[index + 21] === playerTurn
    ) {
      return true
    }
    if (
      index % 7 < 4 &&
      index < 18 &&
      cells[index] === playerTurn &&
      cells[index + 8] === playerTurn &&
      cells[index + 16] === playerTurn &&
      cells[index + 24] === playerTurn
    ) {
      return true
    }
    if (
      index % 7 >= 3 &&
      index < 18 &&
      cells[index] === playerTurn &&
      cells[index + 6] === playerTurn &&
      cells[index + 12] === playerTurn &&
      cells[index + 18] === playerTurn
    ) {
      return true
    }
  }
}
let playerTurn = saturnTurn
let hoverColumn = -1
let animating = false
for (let i = 0; i < 42; i++) {
  let cell = document.createElement('div')
  cell.className = 'cell'
  board.appendChild(cell)

  cell.onmouseenter = () => {
    onMouseEnteredColumn(i % 7)
  }
  cell.onclick = () => {
    if (!animating) {
      onColumnClicked(i % 7)
    }
  }
}

function onColumnClicked(column) {
  let availableRow = cells
    .filter((_, index) => index % 7 === column)
    .lastIndexOf(0)
  if (availableRow === -1) {
    return
  }
  cells[availableRow * 7 + column] = playerTurn
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
  animating = true
  removeUnplacedPiece()
  let animation = piece.animate(
    [
      { transform: `translateY(${yDiff}px)`, offset: 0 },
      { transform: `translateY(0px)`, offset: 0.6 },
      { transform: `translateY(${yDiff / 20}px)`, offset: 0.8 },
      { transform: `translateY(0px)`, offset: 0.95 }
    ],
    {
      duration: 400,
      easing: 'linear',
      iterations: 1
    }
  )
  animation.addEventListener('finish', checkGameWinOrDraw)
}
function checkGameWinOrDraw() {
  animating = false
  if (!cells.includes(0)) {
    confirm('Game is drawn')
    location.reload()
  }
  if (hasPlayerWon(playerTurn, cells)) {
    confirm(`${playerTurn === saturnTurn ? 'SATURN' : 'EARTH'} WON!`)
    location.reload()
  }
  if (playerTurn === saturnTurn) {
    playerTurn = earthTurn
  } else {
    playerTurn = saturnTurn
  }
  updateHover()
}
function updateHover() {
  removeUnplacedPiece()
  if (cells[hoverColumn] === 0) {
    let cell = board.children[hoverColumn]
    let piece = document.createElement('div')
    piece.className = 'piece'
    piece.dataset.placed = false
    piece.dataset.player = playerTurn
    cell.appendChild(piece)
  }
}
function removeUnplacedPiece() {
  let unPlacedPiece = document.querySelector("[data-placed='false']")
  if (unPlacedPiece) {
    unPlacedPiece.parentElement.removeChild(unPlacedPiece)
  }
}
function onMouseEnteredColumn(column) {
  hoverColumn = column
  if (!animating) {
    updateHover()
  }
}
