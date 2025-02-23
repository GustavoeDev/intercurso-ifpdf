// Adicionar novo membro

const modalAddNewMember = document.querySelector(".add-new-member-dialog");
const buttonCloseModalAddNewMember = modalAddNewMember.querySelector(".dialog-header button");
const formNewMember = document.querySelector(".add-new-member-dialog form");

const addNewMemberButton = document.querySelector(".add-new-member");

addNewMemberButton.addEventListener("click", () => {
  modalAddNewMember.showModal();
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

document.addEventListener("DOMContentLoaded", function () {
  const modalDeleteMember = document.querySelector(".remove-member-dialog");
  const spanMemberName = modalDeleteMember.querySelector(".member-name-span");
  const buttonCloseModalDeleteMember = modalDeleteMember.querySelector(".dialog-header button");

  const deleteMemberButtons = document.querySelectorAll(".remove-member");

  deleteMemberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const memberNameContent = button.parentElement.parentElement.children[0].textContent;
      const memberId = button.dataset.memberId;
      const teamId = button.dataset.teamId;

      spanMemberName.textContent = memberNameContent;

      const form = modalDeleteMember.querySelector("#form-delete-member");
      form.action = `/organizador/equipes/editar-equipe/${teamId}/remover-membro/${memberId}`;
      const errorDiv = form.querySelector(".error-messages");

      modalDeleteMember.showModal();

      form.onsubmit = function (event) {
        event.preventDefault();

        const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
        const formData = new FormData();
        formData.append("csrfmiddlewaretoken", csrfToken);
        formData.append("member_id", memberId);

        fetch(form.action, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              modalDeleteMember.close();
              window.location.reload();
            } else {
              errorDiv.innerHTML = data.message;
              errorDiv.style.display = "block";
            }
          })
          .catch((error) => {
            alert("Ocorreu um erro ao remover o membro.");
          });
      };
    });
  });

  buttonCloseModalDeleteMember.addEventListener("click", () => {
    modalDeleteMember.close();
  });
});
