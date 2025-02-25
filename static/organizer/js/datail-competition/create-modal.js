const endCompButton = document.querySelector("#end-comp-button");
const endCompDialog = document.querySelector(".end-comp-dialog");
const closeEndCompDialog = endCompDialog.querySelector(".dialog-header button");

endCompButton.addEventListener("click", () => {
  endCompDialog.showModal();
});

closeEndCompDialog.addEventListener("click", () => {
  endCompDialog.close();
});

const cardsRoundContent = document.querySelectorAll(".card-round-container-content");
const editScoreboardDialog = document.querySelector(".edit-scoreboard-dialog");
const closeEditScoreboardDialog = editScoreboardDialog.querySelector(
  ".edit-scoreboard-dialog-content .dialog-header button"
);
const editScoreboardForm = editScoreboardDialog.querySelector(".edit-scoreboard-dialog form");

cardsRoundContent.forEach((card) => {
  card.addEventListener("click", () => {
    editScoreboardForm.action = card.dataset.url;
    console.log(card.parentElement);

    const teams = card.querySelectorAll(".card-round-container-name p");
    const scores = card.querySelectorAll(".card-round-container-score span");
    const team_a = document.querySelector(
      ".edit-scoreboard-dialog form .edit-scoreboard-container .teams-container #home-team"
    );
    team_a.textContent = teams[0].textContent;
    const team_b = document.querySelector(
      ".edit-scoreboard-dialog form .edit-scoreboard-container .teams-container #away-team"
    );
    team_b.textContent = teams[1].textContent;
    const score_a = editScoreboardForm.querySelector("#id_score_a");
    score_a.value = parseInt(scores[1].textContent);
    const score_b = editScoreboardForm.querySelector("#id_score_b");
    score_b.value = parseInt(scores[0].textContent);

    const finishedInput = editScoreboardForm.querySelector("#id_status");

    if (card.dataset.status == "finished") {
      finishedInput.checked = true;
    } else {
      finishedInput.checked = false;
      editScoreboardDialog.showModal();
    }
  });
});

closeEditScoreboardDialog.addEventListener("click", () => {
  editScoreboardDialog.close();
});

const buttonsEditGame = document.querySelectorAll(".edit-game-button");
const editGameDialog = document.querySelector(".edit-game-dialog");
const closeEditGameDialog = editGameDialog.querySelector(".edit-game-dialog-content .dialog-header button");
const editGameForm = editGameDialog.querySelector(".edit-game-dialog form");

buttonsEditGame.forEach((btn) => {
  btn.addEventListener("click", () => {
    editGameForm.action = btn.dataset.url;
    const inputDate = editGameForm.querySelector("#id_date");
    inputDate.value = btn.dataset.date;
    const inputTime = editGameForm.querySelector("#id_time");
    inputTime.value = btn.dataset.time;

    if (btn.dataset.status !== "finished") {
      editGameDialog.showModal();
    }
  });
});

closeEditGameDialog.addEventListener("click", () => {
  editGameDialog.close();
});
