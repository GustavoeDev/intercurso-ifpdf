const typeRequest = document.querySelectorAll(".table-row td");

typeRequest.forEach((type) => {
  if (
    type.textContent.trim() === "Aprovar equipe" ||
    type.textContent.trim() === "Editar dados"
  ) {
    type.style.color = "#4caf50";
  }
  if (
    type.textContent.trim() === "Excluir equipe" ||
    type.textContent.trim() === "Excluir participante"
  ) {
    type.style.color = "#c90c10";
  }
});
