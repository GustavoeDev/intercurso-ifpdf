const btnShowRequest = document.querySelectorAll(".show-request");

const approveTeamDialog = document.querySelector(".approve-team-dialog");
const btnCloseApproveTeamDialog = document.querySelector(
  ".approve-team-dialog .dialog-header button"
);

btnShowRequest.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tableRow = btn.closest(".table-row");
    const typeRequestRelated = tableRow
      .querySelector(".type-request")
      .textContent.trim()
      .toLowerCase();

    if (typeRequestRelated === "aprovar equipe") {
      approveTeamDialog.showModal();
      console.log("entrou");
    }
  });
});

btnCloseApproveTeamDialog.addEventListener("click", () => {
  approveTeamDialog.close();
});
