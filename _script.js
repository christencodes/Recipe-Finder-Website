`use strict`;
//*HELPER Variables
const tablet = 769;
const mobile = 375;

//*NAV Variables
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");
const heroImage = document.getElementById("hero-img");

//* FILTER OPTIONS Variables
const maxPrepTime = document.getElementById("max-prep-time");
const maxPrepTimeOptions = document.querySelector(".max-prep-time-options");
const maxCookTime = document.getElementById("max-cook-time");
const maxCookTimeOptions = document.querySelector(".max-cook-time-options");
const radioButtonsMaxPrepTime = maxPrepTimeOptions.querySelectorAll(
  'input[type="radio"]'
);
const radioButtonsMaxCookTime = maxCookTimeOptions.querySelectorAll(
  'input[type="radio"]'
);
const searchInput = document.getElementById("search");
const clear = document.querySelectorAll(".clear");

//* EVENT LISTENERS
window.addEventListener("resize", (e) => {
  // e.preventDefault();
  // console.log(window.screen.width);
  tabletAdjust();
});

searchInput.addEventListener("input", (e) => {
  console.log("clickity clack...");
});

maxPrepTime.addEventListener("click", (e) => {
  console.log("hello");
  maxPrepTimeOptions.classList.toggle("hide-me");
});

maxCookTime.addEventListener("click", (e) => {
  console.log("hello");
  maxCookTimeOptions.classList.toggle("hide-me");
});

clear.forEach((element) => {
  element.addEventListener("click", (e) => {
    let parent = e.target.parentElement.classList;

    switch (true) {
      case parent.contains("max-prep-time-options"):
        clearChecked(radioButtonsMaxPrepTime);
        break;
      case parent.contains("max-cook-time-options"):
        clearChecked(radioButtonsMaxCookTime);
      default:
        break;
    }
  });
});

//*HELPER FUNCTIONS

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
  // heroImage.src = "/assets/images/image-home-hero-large.webp";
}

function clearChecked(arr) {
  arr.forEach((e) => {
    e.checked = false;
  });
}

function populateCards() {
  //Ingredients
  // Max Prep Time + Max Cook Time + Search
}

//? JSON Data

async function getFoodData() {
  const jsonUrl = "data.json";
  const request = new Request(jsonUrl);

  const response = await fetch(request);
  const dataText = await response.text();

  if (!response.ok) throw new Error("what is that ⁉️");

  const data = JSON.parse(dataText);

  return data;
}

const data = await getFoodData();
console.log(typeof data);

getFoodData().then((e) => {
  //have to do everything IN THIS THING!
});

/* ?
1. Image - based on the screen width
2. Title - (not the slug)
3. Overview
4. Servings
5. Prep Minutes
6. Cook Minutes
4. */
