document.addEventListener("change", (event) => {
  const select = event.target;

  if (select.tagName === "SELECT") {
    if (
      select.name === "modality" ||
      select.closest("#members-input-container")
    ) {
      if (select.value === "") {
        select.classList.add("invalid");
        select.classList.remove("valid");
      } else {
        select.classList.remove("invalid");
        select.classList.add("valid");
      }
    }
  }
});

const selectInput = document.querySelector("dialog select");

function changeSelect() {
  selectInput.addEventListener("click", () => {
    if (selectInput.value === "") {
      selectInput.classList.add("invalid");
    } else {
      selectInput.classList.remove("invalid");
      selectInput.classList.add("valid");
    }
  });
}

window.addEventListener("load", changeSelect);
