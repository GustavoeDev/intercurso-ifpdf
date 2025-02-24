const cardGameContainer = document.querySelectorAll(".games-card-container");
const buttonsCardContainer = document.querySelector(".all-games-navigation");

// Limpar a navegação
buttonsCardContainer.innerHTML = "";

// Filtrar apenas containers que realmente têm jogos
const containersWithGames = Array.from(cardGameContainer).filter(
  (container) => container.querySelectorAll(".card-all-games").length > 0
);

// Mostrar apenas a primeira rodada válida
if (containersWithGames.length > 0) {
  // Esconder todos os containers primeiro
  cardGameContainer.forEach((cont) => cont.classList.remove("enabled"));

  // Mostrar apenas o primeiro container com jogos
  containersWithGames[0].classList.add("enabled");

  // Criar botões apenas para containers que têm jogos
  containersWithGames.forEach((container, index) => {
    const newBtn = document.createElement("button");
    newBtn.textContent = `Rodada ${index + 1}`;
    buttonsCardContainer.appendChild(newBtn);

    // Ativar o primeiro botão
    if (index === 0) {
      newBtn.classList.add("active");
    }

    newBtn.addEventListener("click", () => {
      // Desativar todos os botões
      buttonsCardContainer.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));

      // Ativar apenas o botão clicado
      newBtn.classList.add("active");

      // Esconder todos os containers
      cardGameContainer.forEach((cont) => cont.classList.remove("enabled"));

      // Mostrar apenas o container correspondente
      container.classList.add("enabled");
    });
  });
}

// Truncar nomes de equipes longos
const nameTeam = document.querySelectorAll(".card-all-games-score p");
nameTeam.forEach((team) => {
  const originalText = team.textContent.trim();
  if (originalText.length > 18) {
    team.textContent = originalText.substring(0, 18) + "...";
    team.setAttribute("title", originalText);
  }
});
