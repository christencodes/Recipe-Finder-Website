`use strict`;
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");
const heroImage = document.getElementById("hero-img");

const radioButtons = document.querySelectorAll('input[type="radio"]');

const maxPrepTime = document.getElementById("max-prep-time");
const maxPrepTimeOptions = document.querySelector(".max-prep-time-options");

maxPrepTime.addEventListener("click", (e) => {
  console.log("hello");
  maxPrepTimeOptions.classList.toggle("hide-me");
});

const clear = document.getElementById("clear");

clear.addEventListener("click", (e) => {
  clearChecked();
});

function clearChecked() {
  radioButtons.forEach((e) => {
    e.checked = false;
  });
}

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

//!remember to do onload

//function to get the json data

//populate the cards with the data

/* ?
1. Image - based on the screen width
2. Title - (not the slug)
3. Overview
4. Servings
5. Prep Minutes
6. Cook Minutes
4. */
