const selectInput = document.querySelector("#login-cursos");

function changeSelect() {
  selectInput.addEventListener("click", () => {
    if (selectInput.value === "default-value") {
      selectInput.classList.add("invalid");
      console.log("invalid");
    } else {
      selectInput.classList.remove("invalid");
      selectInput.classList.add("valid");
      console.log("valid");
    }
  });
}

window.addEventListener("load", changeSelect);
