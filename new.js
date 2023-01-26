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
}
