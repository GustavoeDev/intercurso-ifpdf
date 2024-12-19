const btnShowRequest = document.querySelectorAll(".show-request");

// Aprovar equipe modal

const approveTeamDialog = document.querySelector(".approve-team-dialog");
const btnCloseApproveTeamDialog = document.querySelector(
  ".approve-team-dialog .dialog-header button"
);

// Excluir equipe modal

const removeTeamDialog = document.querySelector(".remove-team-dialog");
const btnCloseRemoveTeamDialog = document.querySelector(
  ".remove-team-dialog .dialog-header button"
);

// Editar dados do participante modal

const editPlayerDialog = document.querySelector(".edit-player-dialog");
const btnCloseEditPlayerDialog = document.querySelector(
  ".edit-player-dialog .dialog-header button"
);

// Excluir participante modal

btnShowRequest.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tableRow = btn.closest(".table-row");
    const typeRequestRelated = tableRow
      .querySelector(".type-request")
      .textContent.trim()
      .toLowerCase();

    if (typeRequestRelated === "aprovar equipe") {
      approveTeamDialog.showModal();
    } else if (typeRequestRelated === "excluir equipe") {
      removeTeamDialog.showModal();
    } else if (typeRequestRelated === "editar dados") {
      editPlayerDialog.showModal();
    }
  });
});

btnCloseApproveTeamDialog.addEventListener("click", () => {
  approveTeamDialog.close();
});

btnCloseRemoveTeamDialog.addEventListener("click", () => {
  removeTeamDialog.close();
});

btnCloseEditPlayerDialog.addEventListener("click", () => {
  editPlayerDialog.close();
});
