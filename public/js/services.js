// Slideshow functionality
function initSlideshow() {
  let slideIndex = 1;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showSlides(n) {
    // Remove active class from all slides and dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    // Adjust index if out of bounds
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // Add active class to current slide and dot
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
  }

  function changeSlide(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => changeSlide(-1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => changeSlide(1));
  }

  // Add click events to dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => currentSlide(i + 1));
  }

  // Auto advance slides
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Initialize slideshow when content is loaded
document.addEventListener("DOMContentLoaded", initSlideshow);

// Re-initialize slideshow when services section is loaded
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.id === "services" && mutation.type === "childList") {
      initSlideshow();
    }
  });
});

observer.observe(document.getElementById("services"), {
  childList: true,
  subtree: true,
});
