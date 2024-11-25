const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const totalSlides = document.querySelectorAll(".carousel-item").length;
const indicatorContainer = document.querySelector(".carousel-indicators");

let currentSlide = 0;

function updateCarousel() {
  const wrapper = document.querySelector(".carousel-wrapper");

  if (currentSlide >= totalSlides) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide < 0) {
    currentSlide = 0;
  }

  const offset = -currentSlide * 100;
  wrapper.style.transform = `translateX(${offset}%)`;

  updateIndicators();

  if (currentSlide === 0) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }

  if (currentSlide === totalSlides - 1) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}

function indicatorTotal() {
  const indicators = document.querySelectorAll(".indicator");
  const totalIndicator = totalSlides - indicators.length;

  if (totalIndicator > 0) {
    for (let i = 0; i < totalIndicator; i++) {
      const spanIndicator = document.createElement("span");
      spanIndicator.classList.add("indicator");
      indicatorContainer.appendChild(spanIndicator);
    }
  }
}

window.addEventListener("load", indicatorTotal);
window.addEventListener("load", updateCarousel);

function updateIndicators() {
  indicators = document.querySelectorAll(".indicator");

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
      console.log(index);
    });

    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

next.addEventListener("click", () => {
  currentSlide++;
  updateCarousel();
});

prev.addEventListener("click", () => {
  currentSlide--;
  updateCarousel();
});
