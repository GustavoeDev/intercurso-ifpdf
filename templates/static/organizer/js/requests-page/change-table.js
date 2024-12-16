const buttonTable = document.querySelectorAll(".card-actions button");

buttonTable.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    changeTable(btn);
    buttonTable.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
      }
    });
  });
});

// Trocar a tabela

const tableTeams = document.querySelector(".table-teams");
const tablePlayers = document.querySelector(".table-players");

function changeTable(btn) {
  if (btn.classList.contains("manage-teams-container")) {
    tableTeams.classList.remove("disabled");
    tablePlayers.classList.add("disabled");
  }

  if (btn.classList.contains("manage-players-container")) {
    tableTeams.classList.add("disabled");
    tablePlayers.classList.remove("disabled");
  }
}
