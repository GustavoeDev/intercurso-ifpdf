const removeTeamButtons = document.querySelectorAll(".remove-team");
const modalRemoveTeam = document.querySelector(".remove-team-dialog");
const modalTeamNameSpan = document.querySelector(".team-name")
const buttonCloseModalRemoveTeam = document.querySelector(
  ".remove-team-dialog .dialog-header button"
);

console.log(removeTeamButtons)

removeTeamButtons.forEach(button => {
  button.addEventListener("click", () => {
    const teamNameContent = button.parentElement.parentElement.querySelector('span').textContent
    modalTeamNameSpan.textContent = teamNameContent
    modalRemoveTeam.showModal();
  });
});


buttonCloseModalRemoveTeam.addEventListener("click", () => {
  modalRemoveTeam.close();
});