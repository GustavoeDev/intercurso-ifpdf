const cardGameContainer = document.querySelectorAll(".games-card-container");
const buttonsCardToggle = document.querySelectorAll(
  ".all-games-navigation button"
);
const buttonsCardContainer = document.querySelector(".all-games-navigation");

cardGameContainer[0].classList.add("enabled");

cardGameContainer.forEach((container, index) => {
  const newBtn = document.createElement("button");
  newBtn.textContent = `Rodada ${index + 1}`;
  buttonsCardContainer.appendChild(newBtn);

  const firstButton = buttonsCardContainer.querySelector("button");
  if (firstButton) {
    firstButton.classList.add("active");
  }

  newBtn.addEventListener("click", () => {
    const allButtons = buttonsCardContainer.querySelectorAll("button");
    allButtons.forEach((btn) => btn.classList.remove("active"));

    newBtn.classList.add("active");

    cardGameContainer.forEach((cont) => cont.classList.remove("enabled"));

    container.classList.add("enabled");
  });
});
