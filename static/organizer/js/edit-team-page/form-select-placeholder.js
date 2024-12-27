const select = document.querySelector('#new-member-course select')

function changeSelect(){
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
}

window.addEventListener("load", changeSelect);
