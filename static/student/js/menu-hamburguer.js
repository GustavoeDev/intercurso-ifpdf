const bars = document.querySelector("#bars");
const x = document.querySelector("#x");
const nav = document.querySelector(".nav-menu");
const link = document.querySelectorAll(".nav-list a");

function updateMenu() {
  if (window.innerWidth > 1000) {
    bars.style.display = "none";
    x.style.display = "none";
    x.classList.remove("active");
    nav.classList.remove("active");
  } else {
    if (nav.classList.contains("active")) {
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

bars.addEventListener("click", () => {
  nav.classList.add("active");
  updateMenu();
});

x.addEventListener("click", () => {
  nav.classList.remove("active");
  updateMenu();
});

link.forEach((item) => {
  item.addEventListener("click", () => {
    nav.classList.remove("active");
    updateMenu();
  });
});
