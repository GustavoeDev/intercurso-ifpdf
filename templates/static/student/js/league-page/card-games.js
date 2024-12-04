const cardGameContainer = document.querySelectorAll(".games-card-container");
const buttonsCardToggle = document.querySelectorAll(
  ".all-games-navigation button"
);

cardGameContainer[0].classList.add("enabled");

buttonsCardToggle.forEach((button, indexButton) => {
  button.addEventListener("click", () => {
    buttonsCardToggle.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    cardGameContainer.forEach((container) =>
      container.classList.remove("enabled")
    );

    cardGameContainer[indexButton].classList.add("enabled");
  });
});
