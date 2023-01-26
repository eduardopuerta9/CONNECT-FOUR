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
