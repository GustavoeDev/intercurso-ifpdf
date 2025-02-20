function initializeFormSelects() {
  // Listener global para todos os selects
  document.addEventListener("change", (event) => {
    const select = event.target;
    if (select.tagName === "SELECT") {
      if (
        select.name === "modality" ||
        select.closest("#members-input-container")
      ) {
        select.classList.toggle("invalid", select.value === "");
        select.classList.toggle("valid", select.value !== "");
      }
    }
  });

  // Listener específico para o select de modalidade
  const modalitySelect = document.querySelector("select");
  if (modalitySelect) {
    // Verifica se o elemento existe
    modalitySelect.addEventListener("click", () => {
      modalitySelect.classList.toggle("invalid", modalitySelect.value === "");
      modalitySelect.classList.toggle("valid", modalitySelect.value !== "");
    });

    // Verificação inicial do estado
    modalitySelect.classList.toggle("invalid", modalitySelect.value === "");
    modalitySelect.classList.toggle("valid", modalitySelect.value !== "");
  }
}

// Inicializa quando o DOM estiver carregado
window.addEventListener("load", initializeFormSelects);
