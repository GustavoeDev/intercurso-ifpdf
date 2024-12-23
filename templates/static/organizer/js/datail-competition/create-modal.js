const endCompButton = document.querySelector("#end-comp-button") 
const detailEndCompButton = document.querySelector("#datail-status-button")
const endCompDialog = document.querySelector(".end-comp-dialog")
const closeEndCompDialog = document.querySelector(".dialog-header button")

endCompButton.addEventListener('click', () => {
  endCompDialog.showModal()
})

detailEndCompButton.addEventListener('click', () => {
  endCompDialog.showModal()
})

closeEndCompDialog.addEventListener('click', () => {
  endCompDialog.close()
})
