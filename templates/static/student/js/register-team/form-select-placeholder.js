const selectInputs = document.querySelectorAll('select')

function changeSelect(){
  selectInputs.forEach((select) => {
  select.addEventListener("click", () => {
    if (select.value === "") {
      select.classList.add("invalid"); 
      console.log('enter')
    } else {
      select.classList.remove("invalid");
      select.classList.add("valid");
      console.log('enter')
    }
  });
});
}

window.addEventListener("load", changeSelect());
