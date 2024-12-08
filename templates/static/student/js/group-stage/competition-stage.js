const buttonPrev = document.querySelector(".competition-stage-button.prev");
const buttonNext = document.querySelector(".competition-stage-button.next");

const allTitles = document.querySelectorAll(".competition-stage h3");

let currentIndex = 0;

buttonNext.addEventListener("click", () => {
  allTitles[currentIndex].classList.remove("active");

  if (currentIndex < allTitles.length - 1) {
    currentIndex++;
  }

  allTitles[currentIndex].classList.add("active");

  if (currentIndex >= allTitles.length - 1) {
    buttonNext.classList.add("disabled");
  } else {
    buttonNext.classList.remove("disabled");
  }

  if (currentIndex > 0) {
    buttonPrev.classList.remove("disabled");
  }

  updateContainer(allTitles[currentIndex]);
});

buttonPrev.classList.add("disabled");

buttonPrev.addEventListener("click", () => {
  allTitles[currentIndex].classList.remove("active");

  if (currentIndex > 0) {
    currentIndex--;
  }

  allTitles[currentIndex].classList.add("active");

  if (currentIndex <= 0) {
    buttonPrev.classList.add("disabled");
  } else {
    buttonPrev.classList.remove("disabled");
  }

  if (currentIndex < allTitles.length - 1) {
    buttonNext.classList.remove("disabled");
  }

  updateContainer(allTitles[currentIndex]);
});

// Troca dos containers

function updateContainer(title) {
  const titleCurrent = title.textContent.trim().replace(/\s+/g, "_");

  const containerTable = document.querySelector(
    ".competition-stage-wrapper-table"
  );

  const allContainers = Array.from(containerTable.children);

  allContainers.forEach((container) => {
    if (titleCurrent === container.id) {
      container.classList.remove("disabled");
    } else {
      container.classList.add("disabled");
    }
  });
}
