document.addEventListener("DOMContentLoaded", () => {
  const approveTeamForm = document.querySelector(".approve-team-dialog form");
  const removeTeamForm = document.querySelector(".remove-team-dialog form");
  const removePlayerForm = document.querySelector(".remove-player-dialog form");

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const requestButton = document.querySelector(".show-request");
    if (!requestButton || !requestButton.dataset.requestId) {
      alert("Erro: ID da solicitação não encontrado.");
      return;
    }

    const requestId = requestButton.dataset.requestId;

    const selectedAction = form.querySelector('input[name="action"]:checked');
    console.log("Ação selecionada:", selectedAction);
    if (!selectedAction) {
      alert("Erro: Nenhuma ação selecionada.");
      return;
    }

    formData.append("action", selectedAction.value);
    formData.append("request_id", requestId);

    try {
      const response = await fetch("/organizador/solicitacoes/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        form.closest("dialog").close();
        window.location.reload();
      } else {
        alert(result.message || "Ocorreu um erro ao processar a solicitação.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert(error.message || "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
    }
  }

  function setupReasonField(form) {
    const radioInputs = form.querySelectorAll('input[name="action"]');
    const reasonField = form.querySelector(".reason_rejected_field");

    if (!reasonField) return;

    radioInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        reasonField.style.display = e.target.value === "rejected" ? "block" : "none";
      });
    });
  }

  if (approveTeamForm) {
    approveTeamForm.addEventListener("submit", handleFormSubmit);
    setupReasonField(approveTeamForm);
  }

  if (removeTeamForm) {
    removeTeamForm.addEventListener("submit", handleFormSubmit);
    setupReasonField(removeTeamForm);
  }

  if (removePlayerForm) {
    removePlayerForm.addEventListener("submit", handleFormSubmit);
    setupReasonField(removePlayerForm);
  }
});
