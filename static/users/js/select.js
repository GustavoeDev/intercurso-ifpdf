const selectInput = document.querySelector("#login-cursos");

function changeSelect() {
  selectInput.addEventListener("click", () => {
    if (selectInput.value === "default-value") {
      selectInput.classList.add("invalid");
    } else {
      selectInput.classList.remove("invalid");
      selectInput.classList.add("valid");
    }
  });
}

window.addEventListener("load", changeSelect);
