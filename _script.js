`use strict`;
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");
const heroImage = document.getElementById("hero-img");

const tablet = 769;
const mobile = 375;

//* Event Listeners
window.addEventListener("resize", (e) => {
  // e.preventDefault();
  console.log(window.screen.width);
  tabletAdjust();
});

//* Helper Functions
function tabletAdjust() {
  if (window.screen.width <= tablet) {
    navLinksDiv.classList.add("hide-me");
    navButton.classList.add("hide-me");
    hamburgerContainer.classList.remove("hide-me");
    //!Hero
    heroImage.src = "/assets/images/image-home-hero-small.webp";
    return;
  }
  navLinksDiv.classList.remove("hide-me");
  navButton.classList.remove("hide-me");
  hamburgerContainer.classList.add("hide-me");
  //!Hero
  heroImage.src = "/assets/images/image-home-hero-large.webp";
}

//!remeber to do onload
