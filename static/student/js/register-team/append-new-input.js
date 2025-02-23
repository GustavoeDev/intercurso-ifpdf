document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-new-member");
  const membersContainer = document.querySelector(".member-inputs");
  const totalInputsSpan = document.querySelector(".total-inputs");
  const maxInputsSpan = document.querySelector(".max-inputs");
  const agreeCheckbox = document.getElementById("agree");
  const submitButton = document.querySelectorAll(".submit-form-create-team");
  const competitionSelect = document.querySelectorAll(".competition-select select");
  const managementForm = document.querySelector("#id_members-TOTAL_FORMS");
  const teamForm = document.querySelectorAll(".new-team-form");
  const initialForm = document.querySelector(".member-inputs .member-group").cloneNode(true);

  const currentPath = window.location.pathname;

  const competitionInputElement = document.querySelector(".competition-id-input");
  const competitionInputPk = competitionInputElement ? competitionInputElement.value : null;

  if (currentPath === `/organizador/equipes/registrar-equipe/competicao/${competitionInputPk}/`) {
    competitionSelect.forEach((select) => {
      select.readOnly = true;
    });
  }

  agreeCheckbox.addEventListener("change", () => {
    if (agreeCheckbox.checked) {
      submitButton.forEach((btn) => {
        btn.disabled = false;
        btn.style.cursor = "pointer";
      });
    } else {
      submitButton.forEach((btn) => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
      });
    }
  });

  function createNewMemberFields(index) {
    const newMemberGroup = initialForm.cloneNode(true);
    newMemberGroup.classList.add("member-group");

    newMemberGroup.querySelector(".member-counter").textContent = `Participante ${index + 1}`;

    const inputs = newMemberGroup.querySelectorAll("input, select");
    inputs.forEach((input) => {
      const oldId = input.id;
      const fieldName = oldId.split("-").pop();
      const newId = `id_members-${index}-${fieldName}`;

      input.id = newId;
      input.name = `members-${index}-${fieldName}`;
      input.value = "";

      const label = newMemberGroup.querySelector(`label[for="${oldId}"]`);
      if (label) {
        label.setAttribute("for", newId);
      }
    });

    const errorMessages = newMemberGroup.querySelectorAll(".error-message");
    errorMessages.forEach((el) => el.remove());

    const limits = getCompetitionLimits();
    if (limits && index >= limits.min) {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.innerHTML = "&#10006;";
      removeButton.classList.add("remove-member");
      removeButton.addEventListener("click", function () {
        newMemberGroup.remove();
        managementForm.value = parseInt(managementForm.value) - 1;
        updateMemberCount();
      });

      newMemberGroup.appendChild(removeButton);
    }

    membersContainer.appendChild(newMemberGroup);
  }

  function updateMemberCount() {
    const currentCount = parseInt(managementForm.value);
    const maxMembers = parseInt(maxInputsSpan.textContent);

    totalInputsSpan.textContent = currentCount;
    addButton.disabled = currentCount >= maxMembers;
    addButton.classList.toggle("disabled", currentCount >= maxMembers);
  }

  function getCompetitionLimits() {
    const select = competitionSelect[0];
    const selectedCompetition = select.value;

    if (!selectedCompetition) return null;

    const minElement = document.querySelector(`.competition-min[data-comp-id="${selectedCompetition}"]`);
    const maxElement = document.querySelector(`.competition-max[data-comp-id="${selectedCompetition}"]`);

    if (minElement && maxElement) {
      return {
        min: parseInt(minElement.textContent.trim()),
        max: parseInt(maxElement.textContent.trim()),
      };
    }
    return null;
  }

  function adjustMemberFields(targetCount) {
    const currentCount = parseInt(managementForm.value);

    if (currentCount < targetCount) {
      for (let i = currentCount; i < targetCount; i++) {
        createNewMemberFields(i);
      }
    } else if (currentCount > targetCount) {
      const allMembers = membersContainer.querySelectorAll(".member-group");
      for (let i = targetCount; i < allMembers.length; i++) {
        allMembers[i].remove();
      }
    }

    managementForm.value = targetCount;
    totalInputsSpan.textContent = targetCount;
  }

  function updateInputsForCompetition() {
    const limits = getCompetitionLimits();

    if (limits) {
      maxInputsSpan.textContent = limits.max;
      adjustMemberFields(limits.min);
    } else {
      adjustMemberFields(1);
      maxInputsSpan.textContent = "1";
    }

    updateMemberCount();
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
  }

  function showFieldError(fieldName, errorMessage) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message text-red-500 text-sm mt-1";
      errorDiv.textContent = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
      input.parentNode.appendChild(errorDiv);
    }
  }

  function showFormErrors(errors) {
    clearErrors();

    Object.entries(errors).forEach(([field, messages]) => {
      if (field === "__all__") {
        const formError = document.createElement("div");
        formError.className = "error-message text-red-500 text-sm mt-4 mb-4";
        formError.textContent = Array.isArray(messages) ? messages.join(", ") : messages;
        teamForm.forEach((form) => {
          form.insertBefore(formError, form.firstChild);
        });
      } else {
        showFieldError(field, messages);
      }
    });
  }

  addButton.addEventListener("click", function () {
    const currentCount = parseInt(managementForm.value);
    const limits = getCompetitionLimits();

    if (limits && currentCount < limits.max) {
      createNewMemberFields(currentCount);
      managementForm.value = currentCount + 1;
      updateMemberCount();
    }
  });

  competitionSelect.forEach((select) => {
    select.addEventListener("change", function () {
      updateInputsForCompetition();
    });
  });

  teamForm.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Form submitted:", this);

      const formData = new FormData(this);

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            const date_request = data.created_at;
            sessionStorage.setItem("sonnerMessage", data.message);
            sessionStorage.setItem("sonnerDate", date_request);

            const currentPath = window.location.pathname;
            if (currentPath === "/registrar-equipe/") {
              window.location.href = "/registrar-equipe/";
            } else {
              window.location.href = `/organizador/equipes/registrar-equipe/competicao/${competitionInputPk}/`;
            }
          } else if (data.errors) {
            showFormErrors(data.errors);
          } else {
            showFormErrors({
              __all__: [
                data.message || "Erro ao processar o formulário. Por favor, verifique os dados e tente novamente.",
              ],
            });
          }
        })
        .catch((error) => {
          console.error("Erro na submissão:", error);
          showFormErrors({
            __all__: ["Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."],
          });
        });
    });
  });

  function showFormErrors(errors) {
    clearErrors();

    Object.entries(errors).forEach(([field, messages]) => {
      if (field === "__all__") {
        const formError = document.createElement("div");
        formError.className = "error-message text-red-500 text-sm mt-4 mb-4";
        formError.textContent = Array.isArray(messages) ? messages.join(", ") : messages;
        teamForm.forEach((form) => {
          form.insertBefore(formError, form.firstChild);
        });
      } else {
        showFieldError(field, messages);
      }
    });

    const firstError = document.querySelector(".error-message");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  updateInputsForCompetition();
});

document.addEventListener("DOMContentLoaded", function () {
  const sonnerMessage = sessionStorage.getItem("sonnerMessage");
  const sonnerDate = sessionStorage.getItem("sonnerDate");

  if (sonnerMessage && sonnerDate) {
    showSonner(sonnerMessage, sonnerDate);

    sessionStorage.removeItem("sonnerMessage");
    sessionStorage.removeItem("sonnerDate");
  }
});

function showSonner(textData, dateRequest) {
  const sonnerContainer = document.querySelector(".sonner-request-container");
  const sonnerText = document.querySelector(".sonner-request-text span");
  const sonnerDate = document.querySelector(".sonner-request-text p");

  if (!sonnerContainer || !sonnerText) return;

  sonnerText.textContent = textData;
  sonnerDate.textContent = dateRequest;

  sonnerContainer.classList.add("show");
  sonnerContainer.classList.remove("hide");

  setTimeout(() => {
    sonnerContainer.classList.remove("show");
    sonnerContainer.classList.add("hide");
  }, 7000);
}

const closeButton = document.querySelector(".sonner-request-close");

if (closeButton) {
  closeButton.addEventListener("click", () => {
    const sonnerContainer = document.querySelector(".sonner-request-container");

    if (sonnerContainer) {
      sonnerContainer.classList.remove("show");
      sonnerContainer.classList.add("hide");
    }
  });
}
