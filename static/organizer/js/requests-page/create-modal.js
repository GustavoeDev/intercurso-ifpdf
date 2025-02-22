document.addEventListener("DOMContentLoaded", () => {
  const btnShowRequest = document.querySelectorAll(".show-request");

  const approveTeamDialog = document.querySelector(".approve-team-dialog");
  const removeTeamDialog = document.querySelector(".remove-team-dialog");
  const removePlayerDialog = document.querySelector(".remove-player-dialog");

  const btnCloseApproveTeamDialog = approveTeamDialog.querySelector(".dialog-header button");
  const btnCloseRemoveTeamDialog = removeTeamDialog.querySelector(".dialog-header button");
  const btnCloseRemovePlayerDialog = removePlayerDialog.querySelector(".dialog-header button");

  function fillApproveTeamModal(data) {
    approveTeamDialog.querySelector(".team-data:nth-child(1) span").textContent = data.team_name;
    approveTeamDialog.querySelector(".team-data:nth-child(2) span").textContent = data.competition;
    approveTeamDialog.querySelector(".team-data:nth-child(3) span").textContent = `${data.members.length} membros`;

    const membersTable = approveTeamDialog.querySelector(".team-table-container-wrapper table");
    membersTable.innerHTML = `
          <tr class="table-header">
              <th>Nome do participante</th>
              <th>Matrícula</th>
              <th>Curso</th>
          </tr>
          ${data.members
            .map(
              (member) => `
              <tr class="table-row">
                  <td>${member.name}</td>
                  <td>${member.registration}</td>
                  <td>${member.course}</td>
              </tr>
          `
            )
            .join("")}
      `;
  }

  function fillRemoveTeamModal(data) {
    removeTeamDialog.querySelector(".team-data:nth-child(1) span").textContent = data.team_name;
    removeTeamDialog.querySelector(".team-data:nth-child(2) span").textContent = data.competition;
    removeTeamDialog.querySelector(".team-data:nth-child(3) span").textContent = `${data.members.length} membros`;

    const membersTable = removeTeamDialog.querySelector(".team-table-container-wrapper table");
    membersTable.innerHTML = `
          <tr class="table-header">
              <th>Nome do participante</th>
              <th>Matrícula</th>
              <th>Curso</th>
          </tr>
          ${data.members
            .map(
              (member) => `
              <tr class="table-row">
                  <td>${member.name}</td>
                  <td>${member.registration}</td>
                  <td>${member.course}</td>
              </tr>
          `
            )
            .join("")}
      `;

    const reasonContent = removeTeamDialog.querySelector(".reason-change-content p");
    if (reasonContent && data.reason) {
      reasonContent.textContent = data.reason;
    }
  }

  function fillRemovePlayerModal(data) {
    const memberToRemove = data.user_remove || {};
    removePlayerDialog.querySelector(".team-data:nth-child(1) span").textContent =
      memberToRemove || "Nome não disponível";

    removePlayerDialog.querySelector(".team-data:nth-child(2) span").textContent =
      data.team_name || "Equipe não disponível";

    removePlayerDialog.querySelector(".team-data:nth-child(3) span").textContent =
      data.competition || "Competição não disponível";

    const reasonContent = removePlayerDialog.querySelector(".reason-change-content p");
    if (reasonContent) {
      reasonContent.textContent = data.reason || "Nenhum motivo fornecido";
    }

    const form = removePlayerDialog.querySelector("form");
    if (form) {
      const requestIdInput = form.querySelector('input[name="request_id"]');
      if (requestIdInput) {
        requestIdInput.value = data.request_id;
      }
    }
  }

  btnShowRequest.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const requestId = btn.getAttribute("data-request-id");

      approveTeamDialog.close();
      removeTeamDialog.close();
      removePlayerDialog.close();

      try {
        const response = await fetch(`/request/${requestId}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const requestData = await response.json();

        const typeRequestRelated = requestData.request_type;

        if (!typeRequestRelated) {
          throw new Error("Tipo de solicitação não encontrado na resposta");
        }

        switch (typeRequestRelated) {
          case "approve_team":
            fillApproveTeamModal(requestData);
            approveTeamDialog.showModal();
            break;
          case "delete_team":
            fillRemoveTeamModal(requestData);
            removeTeamDialog.showModal();
            break;
          case "remove_team_member":
            fillRemovePlayerModal(requestData);
            removePlayerDialog.showModal();
            break;
          default:
            console.error("Tipo de solicitação desconhecido:", typeRequestRelated);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados da solicitação:", error);
      }
    });
  });

  btnCloseApproveTeamDialog.addEventListener("click", () => {
    approveTeamDialog.close();
    resetModal(approveTeamDialog);
  });

  btnCloseRemoveTeamDialog.addEventListener("click", () => {
    removeTeamDialog.close();
    resetModal(removeTeamDialog);
  });

  btnCloseRemovePlayerDialog.addEventListener("click", () => {
    removePlayerDialog.close();
    resetModal(removePlayerDialog);
  });

  document.addEventListener("click", (event) => {
    if (event.target === approveTeamDialog) {
      approveTeamDialog.close();
      resetModal(approveTeamDialog);
    } else if (event.target === removeTeamDialog) {
      removeTeamDialog.close();
      resetModal(removeTeamDialog);
    } else if (event.target === removePlayerDialog) {
      removePlayerDialog.close();
      resetModal(removePlayerDialog);
    }
  });

  function resetModal(modal) {
    const reasonRejectedField = modal.querySelector(".reason_rejected_field");
    const reasonRejectedTextarea = modal.querySelector("#id_reason_rejected");
    const actionInputs = modal.querySelectorAll('input[name="action"]');

    if (reasonRejectedField) {
      reasonRejectedField.style.display = "none";
    }
    if (reasonRejectedTextarea) {
      reasonRejectedTextarea.removeAttribute("required");
      reasonRejectedTextarea.value = "";
    }
    if (actionInputs) {
      actionInputs.forEach((input) => (input.checked = false));
    }
  }
});
