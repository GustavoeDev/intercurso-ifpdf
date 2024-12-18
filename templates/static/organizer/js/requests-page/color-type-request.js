const typeRequest = document.querySelectorAll(".type-request");

typeRequest.forEach((type) => {
  if (
    type.textContent.trim() === "Aprovar equipe" ||
    type.textContent.trim() === "Editar dados"
  ) {
    type.classList.add("approve-request");
  }
  if (
    type.textContent.trim() === "Excluir equipe" ||
    type.textContent.trim() === "Excluir participante"
  ) {
    type.classList.add("delete-request");
  }
});
