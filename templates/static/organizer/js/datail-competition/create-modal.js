const endCompButton = document.querySelector("#end-comp-button")
const detailEndCompButton = document.querySelector("#datail-status-button")
const endCompDialog = document.querySelector(".end-comp-dialog")
const closeEndCompDialog = endCompDialog.querySelector(".dialog-header button")

endCompButton.addEventListener('click', () => {
  endCompDialog.showModal()
})

detailEndCompButton.addEventListener('click', () => {
  endCompDialog.showModal()
})

closeEndCompDialog.addEventListener('click', () => {
  endCompDialog.close()
})

const cardsRoundContent = document.querySelectorAll(".card-round-container-content")
const editScoreboardDialog = document.querySelector(".edit-scoreboard-dialog")
const closeEditScoreboardDialog = editScoreboardDialog.querySelector(".edit-scoreboard-dialog-content .dialog-header button")


cardsRoundContent.forEach(card => {
  card.addEventListener('click', () => {
    editScoreboardDialog.showModal()
  })
});

closeEditScoreboardDialog.addEventListener('click', () => {
  editScoreboardDialog.close()
})

const buttonsEditScoreboard = document.querySelectorAll(".edit-game-button")
const editGameDialog = document.querySelector(".edit-game-dialog")
const closeEditGameDialog = editGameDialog.querySelector(".edit-game-dialog-content .dialog-header button")

buttonsEditScoreboard.forEach(btn => {
  btn.addEventListener('click', () => {
    editGameDialog.showModal()
  })
});

closeEditGameDialog.addEventListener('click', () => {
  editGameDialog.close()
})