// Cadastrar modalidade

const buttonNewModality = document.querySelector(".modality-title button");
const modalNewModality = document.querySelector(".add-new-modality-dialog");
const formNewModality = document.querySelector(".add-new-modality-dialog form");
const buttonCloseModalNewModality = document.querySelector(
  ".add-new-modality-dialog .dialog-header button"
);

buttonNewModality.addEventListener("click", () => {
  modalNewModality.showModal();
});

formNewModality.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formNewModality);

  try {
    const response = await fetch(formNewModality.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })

    console.log("Resposta recebida. Status:", response.status);
    const data = await response.json();
    console.log("Dados da resposta:", data);

    if (data.status === "success") {
      modalNewModality.close();
      formNewModality.reset();
      window.location.reload();
    } else {
      const errorDiv = document.querySelector(
        ".add-new-modality-dialog #error-message"
      );
      errorDiv.textContent = data.message;
      errorDiv.style.display = "block";
    }
  } catch (error) {
    alert("Erro ao adicionar modalidade:\nTente novamente.");
    formNewModality.reset();
  }
});


buttonCloseModalNewModality.addEventListener("click", () => {
  modalNewModality.close();
});

// Editar modalidade

const buttonEditModality = document.querySelectorAll(
  ".card-actions .edit-modality"
);
const modalEditModality = document.querySelector(".edit-modality-dialog");
const buttonCloseModalEditModality = document.querySelector( ".edit-modality-dialog .dialog-header button" );
const nameEditModalityDialog = document.querySelector(".edit-modality-dialog .dialog-header span");
const formEditModality = document.querySelector(".edit-modality-dialog form");

buttonEditModality.forEach((button) => {
  button.addEventListener("click", () => {
    const editModalityUrl = button.dataset.url;
    formEditModality.action = editModalityUrl;
    
    modalEditModality.showModal();

    const tableContainer = button.closest(".table-container");

    const modalInputName = document.querySelector(".edit-modality-dialog form input[name='name']");

    const nameModality = tableContainer.querySelector(".title-text span");
    modalInputName.value = nameModality.textContent;
  });
});

buttonCloseModalEditModality.addEventListener("click", () => {
  modalEditModality.close();
});

// Excluir modalidade

const buttonDeleteModality = document.querySelectorAll(
  ".card-actions .delete-modality"
);
const modalDeleteModality = document.querySelector(".remove-modality-dialog");
const buttonCloseModalDeleteModality = document.querySelector(
  ".remove-modality-dialog .dialog-header button"
);
const nameModalModalityDeleteModality = document.querySelector(
  ".remove-modality-dialog .dialog-header span"
);
const formDeleteModality = document.querySelector(
  ".remove-modality-dialog form"
);

buttonDeleteModality.forEach((button) => {
  button.addEventListener("click", () => {
    const deleteModalityUrl = button.dataset.url;
    formDeleteModality.action = deleteModalityUrl;
    
    modalDeleteModality.showModal();

    const tableContainer = button.closest(".table-container");
    const nameModality = tableContainer.querySelector(".title-text span");

    nameModalModalityDeleteModality.textContent = nameModality.textContent;
  });
});

buttonCloseModalDeleteModality.addEventListener("click", () => {
  modalDeleteModality.close();
});

// Excluir competição

const buttonDeleteCompetition = document.querySelectorAll(".table-row .remove-competition");
const modalDeleteCompetition = document.querySelector(".remove-competition-dialog");
const buttonCloseModalDeleteCompetition = document.querySelector(".remove-competition-dialog .dialog-header button");
const nameModalModalityDeleteCompetition = document.querySelector(".remove-competition-dialog .dialog-header span");
const formDeleteCompetition = document.querySelector(".remove-competition-dialog form");

buttonDeleteCompetition.forEach((button) => {
  button.addEventListener("click", () => {
    const deleteCompetitionUrl = button.dataset.url;
    formDeleteCompetition.action = deleteCompetitionUrl;
    
    modalDeleteCompetition.showModal();

    const row = button.closest("tr");
    const nameModalityDeleteCompetition = row.querySelector("td");

    nameModalModalityDeleteCompetition.textContent =
      nameModalityDeleteCompetition.textContent;
  });
});

buttonCloseModalDeleteCompetition.addEventListener("click", () => {
  modalDeleteCompetition.close();
});

// Criar nova competição

const buttonCreateCompetition = document.querySelectorAll(".card-actions .create-new-competition");
const modalCreateCompetition = document.querySelector(".create-new-competition-dialog");
const buttonCloseModalCreateCompetition = document.querySelector(".create-new-competition-dialog .dialog-header button");
const nameModalModalityCreateCompetition = document.querySelector(".create-new-competition-dialog .dialog-header span");
const formCreateCompetition = document.querySelector(".create-new-competition-dialog form");

buttonCreateCompetition.forEach((button) => {
  button.addEventListener("click", () => {
    const createCompetitionUrl = button.dataset.url;
    formCreateCompetition.action = createCompetitionUrl;

    modalCreateCompetition.showModal();

    const tableContainer = button.closest(".table-container");
    const nameModality = tableContainer.querySelector(".title-text span");

    nameModalModalityCreateCompetition.textContent = nameModality.textContent;
  });
});

buttonCloseModalCreateCompetition.addEventListener("click", () => {
  modalCreateCompetition.close();
});
