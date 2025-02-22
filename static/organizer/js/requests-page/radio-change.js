document.addEventListener("DOMContentLoaded", () => {
  const dialogs = {
    approve: document.querySelector(".approve-team-dialog"),
    remove: document.querySelector(".remove-team-dialog"),
    player: document.querySelector(".remove-player-dialog"),
  };

  function handleRejectRadio(reasonField) {
    reasonField.removeAttribute("style");
    reasonField.classList.add("visible");
  }

  function handleApproveRadio(reasonField) {
    reasonField.classList.remove("visible");
    reasonField.style.display = "none";
  }

  function hideTextArea(modal) {
    const textArea = modal.querySelector(".reason_rejected_field");
    if (textArea) {
      textArea.classList.remove("visible");
      textArea.style.display = "none";
    }
  }

  function resetModalForm(modal) {
    const form = modal.querySelector("form");
    const reasonRejectedField = modal.querySelector(".reason_rejected_field");
    const reasonRejectedTextarea = modal.querySelector(".reason_rejected_field");

    if (form) form.reset();
    if (reasonRejectedField) reasonRejectedField.style.display = "none";
    if (reasonRejectedTextarea) {
      reasonRejectedTextarea.removeAttribute("required");
      reasonRejectedTextarea.value = "";
      reasonRejectedTextarea.classList.remove("visible");
    }
  }

  function setupDialogListeners() {
    Object.values(dialogs).forEach((modal) => {
      if (modal) {
        modal.addEventListener("close", () => {
          resetModalForm(modal);
          hideTextArea(modal);
        });

        window.addEventListener("click", (event) => {
          if (event.target === modal) {
            resetModalForm(modal);
            hideTextArea(modal);
            modal.close();
          }
        });
      }
    });
  }

  function setupRadioGroupListeners() {
    const radioGroups = document.querySelectorAll(".radio-action-group");

    radioGroups.forEach((group) => {
      const approveRadio = group.querySelector('input[value="approve"]');
      const rejectRadio = group.querySelector('input[value="reject"]');
      const reasonField = group.closest("form").querySelector(".reason_rejected_field");

      if (rejectRadio) {
        rejectRadio.addEventListener("change", () => handleRejectRadio(reasonField));
      }

      if (approveRadio) {
        approveRadio.addEventListener("change", () => handleApproveRadio(reasonField));
      }
    });
  }

  setupDialogListeners();
  setupRadioGroupListeners();
});
