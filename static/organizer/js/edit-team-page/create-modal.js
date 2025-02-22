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
const buttonCloseModalDeleteTeam = modalDeleteTeam.querySelector(".dialog-header button");
const formDeleteTeam = modalDeleteTeam.querySelector("#form-delete-team");

const deleteTeamButton = document.querySelector(".delete-team");

deleteTeamButton.addEventListener("click", () => {
  modalDeleteTeam.showModal();
});

buttonCloseModalDeleteTeam.addEventListener("click", () => {
  modalDeleteTeam.close();
});

formDeleteTeam.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  console.log("URL do formulário:", form.action);
  const formData = new FormData(form);
  const errorDiv = form.querySelector(".error-messages");

  try {
    const actionUrl = form.getAttribute("action");
    if (!actionUrl || typeof actionUrl !== "string") {
      throw new Error("URL do formulário inválida.");
    }

    const response = await fetch(actionUrl, {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
      },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("A resposta não é JSON.");
    }

    const data = await response.json();

    if (data.success) {
      window.location.href = "/organizador/equipes/";
    } else {
      errorDiv.innerHTML = data.message || "Ocorreu um erro ao excluir a equipe.";
      errorDiv.style.display = "block";
    }
  } catch (error) {
    console.error("Error:", error);
    errorDiv.innerHTML = "Ocorreu um erro ao processar a solicitação.";
    errorDiv.style.display = "block";
  }
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
