// Players Data

const btnEditPlayer = document.querySelectorAll(".table-row .edit-player");
const modalEditPlayer = document.querySelector(".edit-player-dialog");
const btnCloseModalEditPlayer = document.querySelector(
  ".edit-player-dialog .dialog-header button"
);

const btnRemovePlayer = document.querySelectorAll(".table-row .remove-player");
const modalRemovePlayer = document.querySelector(".remove-player-dialog");
const btnCloseModalRemovePlayer = document.querySelector(
  ".remove-player-dialog .dialog-header button"
);

btnEditPlayer.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalEditPlayer.showModal();

    const row = btn.closest("tr");
    const cells = row.querySelectorAll("td");

    const playerClicked = {
      name: cells[0].innerText,
      enrollmentId: cells[1].innerText,
      course: cells[2].innerText,
    };

    const modalSpan = modalEditPlayer.querySelector("h3 span");
    modalSpan.innerText = playerClicked.name;

    const inputName = modalEditPlayer.querySelector("#edit-player-name");
    const inputEnrollment = modalEditPlayer.querySelector(
      "#edit-player-enrollment"
    );
    const inputCourse = modalEditPlayer.querySelector("#edit-player-course");

    inputName.value = playerClicked.name;
    inputEnrollment.value = playerClicked.enrollmentId;
    inputCourse.value = playerClicked.course;
  });
});

btnCloseModalEditPlayer.addEventListener("click", () => {
  modalEditPlayer.close();
});

btnRemovePlayer.forEach((btn) => {
  btn.addEventListener("click", () => {
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
});

// Teams Data

const btnAddPlayer = document.querySelectorAll(".add-new-member");
const modalAddPlayer = document.querySelector(".add-player-dialog");
const btnCloseModalAddPlayer = document.querySelector(
  ".add-player-dialog .dialog-header button"
);

btnAddPlayer.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalAddPlayer.showModal();
  });
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
