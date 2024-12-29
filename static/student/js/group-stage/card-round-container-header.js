const groupStageRounds = document.querySelectorAll(".group-stage-round");

groupStageRounds.forEach((groupStageRound) => {
  const roundContainers = groupStageRound.querySelectorAll(".round-container");
  const buttonRoundPrev = groupStageRound.querySelectorAll(
    ".round-container-button.prev"
  );
  const buttonRoundNext = groupStageRound.querySelectorAll(
    ".round-container-button.next"
  );

  let currentRoundIndex = 0;

  roundContainers.forEach((container, index) => {
    if (index === 0) {
      container.classList.remove("disabled");
    } else {
      container.classList.add("disabled");
    }
  });

  buttonRoundPrev.forEach((btn) => btn.classList.add("disabled"));

  buttonRoundNext.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentRoundIndex >= roundContainers.length - 1) {
        return;
      }

      roundContainers[currentRoundIndex].classList.add("disabled");

      currentRoundIndex++;

      roundContainers[currentRoundIndex].classList.remove("disabled");

      buttonRoundPrev.forEach((btn) => btn.classList.remove("disabled"));

      if (currentRoundIndex === roundContainers.length - 1) {
        buttonRoundNext.forEach((btn) => btn.classList.add("disabled"));
      }
    });
  });

  buttonRoundPrev.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentRoundIndex <= 0) {
        return;
      }

      roundContainers[currentRoundIndex].classList.add("disabled");

      currentRoundIndex--;

      roundContainers[currentRoundIndex].classList.remove("disabled");

      buttonRoundNext.forEach((btn) => btn.classList.remove("disabled"));

      if (currentRoundIndex === 0) {
        buttonRoundPrev.forEach((btn) => btn.classList.add("disabled"));
      }
    });
  });
});

// Colocar tamanho fixo no nome da equipe

const teamNames = document.querySelectorAll(".card-round-container-name p");

teamNames.forEach((name) => {
  const nameText = name.textContent;
  if (nameText.length > 3) {
    const newName = nameText.substring(0, 3);
    name.textContent = newName;
    name.setAttribute("title", nameText);
  }
});
