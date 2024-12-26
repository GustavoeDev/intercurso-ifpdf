const buttonMenu = document.querySelectorAll(".header-title button");
const navigationMenu = document.querySelector(".navigation-menu-hamburguer");
const bars = document.querySelector(".header-title-bars");
const x = document.querySelector(".header-title-x");

x.classList.add("disabled");

function updateMenu() {
  if (window.innerWidth > 1200) {
    navigationMenu.classList.remove("active");
    bars.style.display = "none";
    x.style.display = "none";
    x.classList.remove("active");
  } else {
    if (navigationMenu.classList.contains("active")) {
      bars.style.display = "none";
      x.style.display = "block";
      x.classList.add("active");
    } else {
      bars.style.display = "block";
      x.style.display = "none";
      x.classList.remove("active");
    }
  }
}

window.addEventListener("load", updateMenu);
window.addEventListener("resize", updateMenu);

buttonMenu.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (navigationMenu.classList.contains("active")) {
      navigationMenu.classList.remove("active");
    } else {
      navigationMenu.classList.add("active");
    }
    updateMenu();
  });
});

x.addEventListener("click", () => {
  navigationMenu.classList.remove("active");
  updateMenu();
});
