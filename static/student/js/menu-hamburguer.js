// menu-hamburguer.js
(function () {
  const menuToggleButton = document.getElementById("bars");
  const closeMenuButton = document.querySelector("#x");
  const navigationMenu = document.querySelector(".nav-menu");
  const navigationLinks = document.querySelectorAll(".nav-list a");

  function updateMenu() {
    if (window.innerWidth > 1000) {
      menuToggleButton.style.display = "none";
      closeMenuButton.style.display = "none";
      closeMenuButton.classList.remove("active");
      navigationMenu.classList.remove("active");
    } else {
      if (navigationMenu.classList.contains("active")) {
        menuToggleButton.style.display = "none";
        closeMenuButton.style.display = "block";
        closeMenuButton.classList.add("active");
      } else {
        menuToggleButton.style.display = "block";
        closeMenuButton.style.display = "none";
        closeMenuButton.classList.remove("active");
      }
    }
  }

  window.addEventListener("load", updateMenu);
  window.addEventListener("resize", updateMenu);
  menuToggleButton.addEventListener("click", () => {
    navigationMenu.classList.add("active");
    updateMenu();
  });
  closeMenuButton.addEventListener("click", () => {
    navigationMenu.classList.remove("active");
    updateMenu();
  });
  navigationLinks.forEach((item) => {
    item.addEventListener("click", () => {
      navigationMenu.classList.remove("active");
      updateMenu();
    });
  });
})();
