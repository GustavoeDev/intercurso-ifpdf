// Remove Player Request

const btnRemovePlayer = document.querySelectorAll(".table-row .remove-player");
const modalRemovePlayer = document.querySelector(".remove-player-dialog");
const btnCloseModalRemovePlayer = document.querySelector(
  ".remove-player-dialog .dialog-header button"
);
const formRemovePlayer = document.querySelector(".remove-player-dialog form");

btnRemovePlayer.forEach((btn) => {
  btn.addEventListener("click", () => {
    const removePlayerUrl = btn.dataset.url;
    formRemovePlayer.action = removePlayerUrl;

    modalRemovePlayer.showModal();

    const row = btn.closest("tr");
    const cells = row.querySelectorAll("td");

    const playerClicked = {
      name: cells[0].innerText,
      enrollmentId: cells[1].innerText,
      course: cells[2].innerText,
    };

    const modalSpan = modalRemovePlayer.querySelector("h3 span");
    modalSpan.innerText = playerClicked.name;
  });
});

btnCloseModalRemovePlayer.addEventListener("click", () => {
  modalRemovePlayer.close();
  formRemovePlayer.reset();
});

formRemovePlayer.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formRemovePlayer);

  try {
    const response = await fetch(formRemovePlayer.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      modalRemovePlayer.close();
      formRemovePlayer.reset();
      alert(data.message);
    } else {
      const errorDiv = document.querySelector("#error-message");
      errorDiv.textContent = data.message;
      errorDiv.style.display = "block";
    }
  } catch (error) {
    alert("Erro ao enviar solicitação. Tente novamente.");
  }
});

// Add Player

const btnAddPlayer = document.querySelectorAll(".add-new-member");
const modalAddPlayer = document.querySelector(".add-player-dialog");
const btnCloseModalAddPlayer = document.querySelector(
  ".add-player-dialog .dialog-header button"
);
const formAddPlayer = document.querySelector(".add-player-dialog form");

// Adicionar form action do modal add-player-dialog
btnAddPlayer.forEach((btn) => {
  btn.addEventListener("click", () => {
    const teamUrl = btn.dataset.url;
    formAddPlayer.action = teamUrl;
    modalAddPlayer.showModal();
  });
});

btnCloseModalAddPlayer.addEventListener("click", (e) => {
  e.preventDefault();
  modalAddPlayer.close();
});

// Enviar formulário do modal add-player-dialog
formAddPlayer.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formAddPlayer);

  try {
    const response = await fetch(formAddPlayer.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      modalAddPlayer.close();
      window.location.reload();
    } else {
      const errorDiv = document.querySelector("#error-message");
      errorDiv.textContent = data.message;
      errorDiv.style.display = "block";
    }
  } catch (error) {
    alert("Erro ao adicionar membro. Tente novamente.");
  }
});

btnCloseModalAddPlayer.addEventListener("click", () => {
  modalAddPlayer.close();
});

const btnRemoveTeam = document.querySelectorAll(".delete-team");
const modalRemoveTeam = document.querySelector(".remove-team-dialog");
const btnCloseModalRemoveTeam = document.querySelector(
  ".remove-team-dialog .dialog-header button"
);

btnRemoveTeam.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalRemoveTeam.showModal();

    const tableTitle = btn.closest(".table-title");

    const titleText = tableTitle.querySelector(".title-text");

    const teamName = titleText.querySelector("span").textContent;
    const competitionName = titleText.querySelector("p").textContent;

    const modalSpan = modalRemoveTeam.querySelector("h3 span");
    modalSpan.innerText = teamName;
  });
});

btnCloseModalRemoveTeam.addEventListener("click", () => {
  modalRemoveTeam.close();
});
