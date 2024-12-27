// Cadastrar modalidade

const buttonNewModality = document.querySelector(".modality-title button");
const modalNewModality = document.querySelector(".add-new-modality-dialog");
const buttonCloseModalNewModality = document.querySelector(
  ".add-new-modality-dialog .dialog-header button"
);

buttonNewModality.addEventListener("click", () => {
  modalNewModality.showModal();
});

buttonCloseModalNewModality.addEventListener("click", () => {
  modalNewModality.close();
});

// Editar modalidade

const buttonEditModality = document.querySelectorAll(
  ".card-actions .edit-modality"
);
const modalEditModality = document.querySelector(".edit-modality-dialog");
const buttonCloseModalEditModality = document.querySelector(
  ".edit-modality-dialog .dialog-header button"
);
const nameEditModalityDialog = document.querySelector(
  ".edit-modality-dialog .dialog-header span"
);

buttonEditModality.forEach((button) => {
  button.addEventListener("click", () => {
    modalEditModality.showModal();

    const tableContainer = button.closest(".table-container");

    const modalInputName = document.querySelector(
      ".edit-modality-dialog #edit-modality-name"
    );

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

buttonDeleteModality.forEach((button) => {
  button.addEventListener("click", () => {
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

const buttonDeleteCompetition = document.querySelectorAll(
  ".table-row .remove-competition"
);
const modalDeleteCompetition = document.querySelector(
  ".remove-competition-dialog"
);
const buttonCloseModalDeleteCompetition = document.querySelector(
  ".remove-competition-dialog .dialog-header button"
);
const nameModalModalityDeleteCompetition = document.querySelector(
  ".remove-competition-dialog .dialog-header span"
);

buttonDeleteCompetition.forEach((button) => {
  button.addEventListener("click", () => {
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

const buttonCreateCompetition = document.querySelectorAll(
  ".card-actions .create-new-competition"
);
const modalCreateCompetition = document.querySelector(
  ".create-new-competition-dialog"
);
const buttonCloseModalCreateCompetition = document.querySelector(
  ".create-new-competition-dialog .dialog-header button"
);
const nameModalModalityCreateCompetition = document.querySelector(
  ".create-new-competition-dialog .dialog-header span"
);

buttonCreateCompetition.forEach((button) => {
  button.addEventListener("click", () => {
    modalCreateCompetition.showModal();

    const tableContainer = button.closest(".table-container");
    const nameModality = tableContainer.querySelector(".title-text span");

    nameModalModalityCreateCompetition.textContent = nameModality.textContent;
  });
});

buttonCloseModalCreateCompetition.addEventListener("click", () => {
  modalCreateCompetition.close();
});
