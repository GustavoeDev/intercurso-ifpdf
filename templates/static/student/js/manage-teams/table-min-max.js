const minMaxButtons = document.querySelectorAll('.min-max-button')

for (const button of minMaxButtons) {
  button.addEventListener('click', () => {
    let container = button.parentElement.parentElement.parentElement
    console.log(container)
    if (container.classList.contains('not-active')){
      container.classList.remove('not-active')
      button.classList.add('min')
    } else {
      container.classList.add('not-active')
      button.classList.remove('min')
    }
  })  
}