// Adicionar novo membro

const modalAddNewMember = document.querySelector(".add-new-member-dialog");
const buttonCloseModalAddNewMember = modalAddNewMember.querySelector(".dialog-header button");
const formNewMember = document.querySelector(".add-new-member-dialog form");

const addNewMemberButton = document.querySelector(".add-new-member");

addNewMemberButton.addEventListener("click", () => {
  modalAddNewMember.showModal();
});

buttonCloseModalAddNewMember.addEventListener("click", () => {
  modalAddNewMember.close();
  formNewMember.reset();
});

// Excluir equipe

const modalDeleteTeam = document.querySelector(".remove-team-dialog");
const spanTeamName = modalDeleteTeam.querySelector(".team-name");
const buttonCloseModalDeleteTeam = modalDeleteTeam.querySelector(".dialog-header button");

const deleteTeamButton = document.querySelector(".delete-team");
const teamNameContent = deleteTeamButton.parentElement.parentElement.querySelector(".card-title span").textContent;

deleteTeamButton.addEventListener("click", () => {
  spanTeamName.textContent = teamNameContent;
  modalDeleteTeam.showModal();
});

buttonCloseModalDeleteTeam.addEventListener("click", () => {
  modalDeleteTeam.close();
});

// Remover membro

const modalDeleteMember = document.querySelector(".remove-member-dialog");
const spanMemberName = modalDeleteMember.querySelector(".member-name-span");
const buttonCloseModalDeleteMember = modalDeleteMember.querySelector(".dialog-header button");

const deleteMemberButtons = document.querySelectorAll(".remove-member");

deleteMemberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const memberNameContent = button.parentElement.parentElement.children[0].textContent;
    spanMemberName.textContent = memberNameContent;
    modalDeleteMember.showModal();
  });
});

buttonCloseModalDeleteMember.addEventListener("click", () => {
  modalDeleteMember.close();
});

formNewMember.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const errorDiv = form.querySelector(".error-messages");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
      },
    });

    const data = await response.json();

    if (data.success) {
      modalAddNewMember.close();
      window.location.reload();
      formNewMember.reset();
    } else {
      if (data.errors) {
        const errors = JSON.parse(data.errors);
        let errorMessages = "";
        for (const field in errors) {
          errorMessages += errors[field].join("<br>") + "<br>";
        }
        errorDiv.innerHTML = errorMessages;
      } else if (data.message) {
        errorDiv.innerHTML = data.message;
      } else {
        errorDiv.innerHTML = "Ocorreu um erro inesperado. Tente novamente.";
      }
      errorDiv.style.display = "block";
    }
  } catch (error) {
    errorDiv.innerHTML = "Ocorreu um erro ao processar a solicitação.";
    errorDiv.style.display = "block";
  }
});
