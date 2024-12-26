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


// Editar membro

const modalEditMember = document.querySelector('.edit-member-dialog')
const buttonCloseModalEditMember = modalEditMember.querySelector(".dialog-header button")

const editMemberButtons = document.querySelectorAll('.edit-member')

editMemberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const memberInfos = button.parentElement.parentElement.children

    const memberName = document.querySelector('#member-name')
    memberName.value = memberInfos[0].textContent
    
    const memberRegistration = document.querySelector('#member-registration')
    memberRegistration.value = memberInfos[1].textContent
    
    const memberCourse = memberInfos[2].textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const courseOptions = modalEditMember.querySelector('select')

    for (let i = 0; i < courseOptions.options.length; i++) {

      if (courseOptions.options[i].value === memberCourse) {
        courseOptions.options[i].selected = true;
      }
    }


    modalEditMember.showModal()
  })
})

buttonCloseModalEditMember.addEventListener('click', () => {
  modalEditMember.close()
})

// Remover membro

const modalDeleteMember = document.querySelector('.remove-member-dialog')
const spanMemberName = modalDeleteMember.querySelector('.member-name-span')
const buttonCloseModalDeleteMember = modalDeleteMember.querySelector(".dialog-header button")

const deleteMemberButtons = document.querySelectorAll('.remove-member')

deleteMemberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const memberNameContent = button.parentElement.parentElement.children[0].textContent
    spanMemberName.textContent = memberNameContent
    modalDeleteMember.showModal()
  })
})

buttonCloseModalDeleteMember.addEventListener('click', () => {
  modalDeleteMember.close()
})