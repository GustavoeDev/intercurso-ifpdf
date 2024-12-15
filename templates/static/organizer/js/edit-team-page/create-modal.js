//Adicionar novo membro

const modalAddNewMember = document.querySelector(".add-new-member-dialog")
const modalTeamNameSpan = document.querySelector(".team-name")
const buttonCloseModalAddNewMember = modalAddNewMember.querySelector(".dialog-header button")

const addNewMemberButtons = document.querySelector(".add-new-member")

addNewMemberButtons.addEventListener("click", () => {
    modalAddNewMember.showModal()
})


buttonCloseModalAddNewMember.addEventListener("click", () => {
  modalAddNewMember.close();
});