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
      const date_request = data.created_at;
      showSonner(data.message, date_request);
    } else {
      const errorDiv = document.querySelector(
        ".remove-player-dialog #error-message"
      );
      errorDiv.textContent = data.message;
      errorDiv.style.display = "block";
    }
  } catch (error) {
    console.error(error);
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
  formAddPlayer.reset();
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
      formAddPlayer.reset();
      window.location.reload();
    } else {
      const errorDiv = document.querySelector(
        ".add-player-dialog #error-message"
      );
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

// Remove Team Request

const btnRemoveTeam = document.querySelectorAll(".delete-team");
const modalRemoveTeam = document.querySelector(".remove-team-dialog");
const btnCloseModalRemoveTeam = document.querySelector(
  ".remove-team-dialog .dialog-header button"
);
const formRemoveTeam = document.querySelector(".remove-team-dialog form");

btnRemoveTeam.forEach((btn) => {
  btn.addEventListener("click", () => {
    const removeTeamUrl = btn.dataset.url;
    formRemoveTeam.action = removeTeamUrl;

    modalRemoveTeam.showModal();

    const tableTitle = btn.closest(".table-title");

    const titleText = tableTitle.querySelector(".title-text");

    const teamName = titleText.querySelector("span").textContent;
    const competitionName = titleText.querySelector("p").textContent;

    const modalSpan = modalRemoveTeam.querySelector("h3 span");
    modalSpan.innerText = teamName;
  });
});

formRemoveTeam.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formRemoveTeam);

  try {
    const response = await fetch(formRemoveTeam.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      modalRemoveTeam.close();
      formRemoveTeam.reset();
      const date_request = data.created_at;
      showSonner(data.message, date_request);
    } else {
      const errorDiv = document.querySelector(
        ".remove-team-dialog #error-message"
      );
      errorDiv.textContent = data.message;
      errorDiv.style.display = "block";
    }
  } catch (error) {
    alert("Erro ao adicionar membro. Tente novamente.");
  }
});

btnCloseModalRemoveTeam.addEventListener("click", () => {
  modalRemoveTeam.close();
  formRemoveTeam.reset();
});

// Mostrar o Sonner

function showSonner(textData, dateRequest) {
  const sonner = document.querySelector(".sonner-request-container");
  const textSonner = document.querySelector(".sonner-request-text span");
  const dateSonner = document.querySelector(".sonner-request-text p");

  if (!sonner || !textSonner) return;

  textSonner.textContent = textData;
  dateSonner.textContent = dateRequest;

  sonner.classList.add("show");
  sonner.classList.remove("hide");

  setTimeout(() => {
    sonner.classList.remove("show");
    sonner.classList.add("hide");
  }, 7000);
}

document
  .querySelector(".sonner-request-close")
  .addEventListener("click", () => {
    const sonner = document.querySelector(".sonner-request-container");
    sonner.classList.remove("show");
    sonner.classList.add("hide");
  });
