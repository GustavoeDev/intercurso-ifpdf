const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicatorContainer = document.querySelector(".carousel-indicators");
let totalSlides = document.querySelectorAll(".carousel-item").length;

let currentSlide = 0;

window.addEventListener("load", indicatorTotal);
window.addEventListener("load", updateCarousel);
window.addEventListener("load", redistributeCards);
window.addEventListener("resize", redistributeCards);

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

function updateIndicators() {
  const indicators = document.querySelectorAll(".indicator");

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

function redistributeCards() {
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  let carouselItems = Array.from(document.querySelectorAll(".carousel-item"));

  if (window.innerWidth >= 1000) {
    carouselWrapper.innerHTML = "";

    let allCards = [];

    carouselItems.forEach((item) => {
      const cards = Array.from(item.querySelectorAll(".competitions-card"));
      allCards = allCards.concat(cards);
    });

    for (let i = 0; i < allCards.length; i += 3) {
      const newCarouselItem = document.createElement("div");
      newCarouselItem.classList.add("carousel-item");

      newCarouselItem.appendChild(allCards[i]);

      if (allCards[i + 1]) {
        newCarouselItem.appendChild(allCards[i + 1]);
      }

      if (allCards[i + 2]) {
        newCarouselItem.appendChild(allCards[i + 2]);
      }

      carouselWrapper.appendChild(newCarouselItem);
    }

    carouselItems = Array.from(document.querySelectorAll(".carousel-item"));

    totalSlides = carouselItems.length;
    currentSlide = 0;

    indicatorContainer.innerHTML = "";
    indicatorTotal();
    updateIndicators();
    updateCarousel();
  } else if (window.innerWidth >= 650) {
    let allCards = [];

    carouselItems.forEach((item) => {
      const cards = Array.from(item.querySelectorAll(".competitions-card"));
      allCards = allCards.concat(cards);
    });

    carouselWrapper.innerHTML = "";

    for (let i = 0; i < allCards.length; i += 2) {
      const newCarouselItem = document.createElement("div");
      newCarouselItem.classList.add("carousel-item");

      newCarouselItem.appendChild(allCards[i]);

      if (allCards[i + 1]) {
        newCarouselItem.appendChild(allCards[i + 1]);
      }

      carouselWrapper.appendChild(newCarouselItem);
    }

    carouselItems = Array.from(document.querySelectorAll(".carousel-item"));

    totalSlides = carouselItems.length;
    currentSlide = 0;

    indicatorContainer.innerHTML = "";
    indicatorTotal();
    updateIndicators();
    updateCarousel();
  } else {
    let allCards = [];

    carouselItems.forEach((item) => {
      const cards = Array.from(item.querySelectorAll(".competitions-card"));
      allCards = allCards.concat(cards);
    });

    carouselWrapper.innerHTML = "";

    for (let i = 0; i < allCards.length; i += 1) {
      const newCarouselItem = document.createElement("div");
      newCarouselItem.classList.add("carousel-item");

      newCarouselItem.appendChild(allCards[i]);

      carouselWrapper.appendChild(newCarouselItem);
    }

    carouselItems = Array.from(document.querySelectorAll(".carousel-item"));

    totalSlides = carouselItems.length;
    currentSlide = 0;

    indicatorContainer.innerHTML = "";
    indicatorTotal();
    updateIndicators();
    updateCarousel();
  }
}

next.addEventListener("click", () => {
  currentSlide++;
  updateCarousel();
});

prev.addEventListener("click", () => {
  currentSlide--;
  updateCarousel();
});
