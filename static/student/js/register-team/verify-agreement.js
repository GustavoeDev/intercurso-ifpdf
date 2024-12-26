const submitFormButton = document.querySelector("#submit-form")
const agreeCheckbox = document.querySelector("#agree")

agreeCheckbox.addEventListener('change', () => {
  if (agreeCheckbox.checked) {
    submitFormButton.disabled = false; 
    submitFormButton.style.cursor = "pointer"
  }
  else {
    submitFormButton.disabled = true; 
    submitFormButton.style.cursor = "not-allowed"
  }
})
