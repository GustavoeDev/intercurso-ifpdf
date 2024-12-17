// Adicionar novo membro

const modalAddNewMember = document.querySelector(".add-new-member-dialog")
const buttonCloseModalAddNewMember = modalAddNewMember.querySelector(".dialog-header button")

const addNewMemberButton = document.querySelector(".add-new-member")

addNewMemberButton.addEventListener("click", () => {
    modalAddNewMember.showModal()
})


buttonCloseModalAddNewMember.addEventListener("click", () => {
  modalAddNewMember.close();
});

// Excluir equipe

const modalDeleteTeam = document.querySelector('.remove-team-dialog')
const spanTeamName = modalDeleteTeam.querySelector('.team-name')
const buttonCloseModalDeleteTeam = modalDeleteTeam.querySelector(".dialog-header button")

const deleteTeamButton = document.querySelector('.delete-team')
const teamNameContent = deleteTeamButton.parentElement.parentElement.querySelector('.card-title span').textContent

deleteTeamButton.addEventListener('click', () => {
  spanTeamName.textContent = teamNameContent
  modalDeleteTeam.showModal()
})

buttonCloseModalDeleteTeam.addEventListener('click', () => {
  modalDeleteTeam.close()
})
