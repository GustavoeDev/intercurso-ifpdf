document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os modais
  const dialogs = {
    approve: document.querySelector(".approve-team-dialog"),
    remove: document.querySelector(".remove-team-dialog"),
    player: document.querySelector(".remove-player-dialog"),
  };

  // Função para atualizar o campo de motivo de rejeição
  function updateReasonRejectedField(modal, selectedValue) {
    const reasonRejectedField = modal.querySelector(".reason_rejected_field");
    const reasonRejectedTextarea = modal.querySelector("#id_reason_rejected");

    if (!reasonRejectedField || !reasonRejectedTextarea) return;

    if (selectedValue === "rejected") {
      reasonRejectedField.style.display = "block";
      reasonRejectedTextarea.setAttribute("required", true);
    } else {
      reasonRejectedField.style.display = "none";
      reasonRejectedTextarea.removeAttribute("required");
      reasonRejectedTextarea.value = "";
    }
  }

  // Função para configurar os radio buttons de cada modal
  function setupRadioGroup(modal, suffix) {
    const radioGroup = modal.querySelector(".radio-action-group");
    const labels = radioGroup.querySelectorAll(".radio-action-item");

    labels.forEach((label) => {
      // Encontra o input radio dentro do label
      const radio = label.querySelector('input[type="radio"]');
      if (!radio) return;

      // Atualiza os IDs e names para evitar conflitos
      const originalId = radio.id;
      radio.id = `${originalId}_${suffix}`;
      radio.name = `action_${suffix}`;

      // Atualiza o for do label
      label.setAttribute("for", radio.id);

      // Adiciona evento de clique no label
      label.addEventListener("click", (e) => {
        e.preventDefault();
        radio.checked = true;
        updateReasonRejectedField(modal, radio.value);
      });
    });
  }

  Object.entries(dialogs).forEach(([type, modal]) => {
    if (modal) {
      setupRadioGroup(modal, type);
    }
  });

  function resetModalForm(modal) {
    const form = modal.querySelector("form");
    const reasonRejectedField = modal.querySelector(".reason_rejected_field");
    const reasonRejectedTextarea = modal.querySelector("#id_reason_rejected");

    if (form) form.reset();
    if (reasonRejectedField) reasonRejectedField.style.display = "none";
    if (reasonRejectedTextarea) {
      reasonRejectedTextarea.removeAttribute("required");
      reasonRejectedTextarea.value = "";
    }
  }

  Object.values(dialogs).forEach((modal) => {
    if (modal) {
      modal.addEventListener("close", () => resetModalForm(modal));
    }
  });
});
