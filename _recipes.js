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
  'input[type="radio"]',
);
const radioButtonsMaxCookTime = maxCookTimeOptions.querySelectorAll(
  'input[type="radio"]',
);
const cardContainer = document.getElementById("recipe-card-grid");
const searchInput = document.getElementById("search");
const clear = document.querySelectorAll(".clear");

//*Testing
console.log(!searchInput.value);

//*--------------------------------------

//* EVENT LISTENERS
window.addEventListener("resize", (e) => {
  // e.preventDefault();
  // console.log(window.screen.width);
  tabletAdjust();
});

searchInput.addEventListener("input", (e) => {
  //remove current cards
  cardContainer.innerHTML = "";
  // console.log("clickity clack...");
  //!Searches through name and ingredient as we input characters
  searchData();
  //need a function
});

maxCookTimeOptions.addEventListener("input", (e) => {
  cardContainer.innerHTML = "";
  searchData();
});

maxPrepTimeOptions.addEventListener("input", (e) => {
  cardContainer.innerHTML = "";
  searchData();
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
    // navLinksDiv.classList.add("hide-me");
    // navButton.classList.add("hide-me");
    // hamburgerContainer.classList.remove("hide-me");
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

//? Card Template

//Reference to the card container
//Reference to the card template

const cardTemplate = document.getElementById("card-template");
// console.log(cardTemplate);

function cardBuilder(recipeInfo) {
  const recipeCardInstance = cardTemplate.content.cloneNode(true);
  //card-image
  const recipeCardImage = recipeCardInstance.getElementById("recipe-img");
  recipeCardImage.src = recipeInfo.image.large;

  //card-title
  const recipeCardTitle = recipeCardInstance.getElementById("title");
  recipeCardTitle.textContent = recipeInfo.title;
  // recipeCardTitle = recipeCardInstance
  const recipeCardOverview = recipeCardInstance.getElementById("overview");
  recipeCardOverview.textContent = recipeInfo.overview;
  //overview
  const recipeCardServings = recipeCardInstance.getElementById("servings");
  recipeCardServings.textContent += ` ${recipeInfo.servings}`;
  //servings
  const recipeCardPrepTime = recipeCardInstance.getElementById("prep-time");
  recipeCardPrepTime.textContent += ` ${recipeInfo.prepMinutes}`;
  //prep time
  const recipeCardCookTime = recipeCardInstance.getElementById("cook-time");
  recipeCardCookTime.textContent += ` ${recipeInfo.cookMinutes}`;
  //cook time

  //append the card to the container
  cardContainer.appendChild(recipeCardInstance);
}
// shows all recipes immediately
(function showAllrecipes() {
  //show all recipes when pages first loads
  data.forEach((recipe) => {
    cardBuilder(recipe);
  });
})();

function gatherPrepTimes() {
  let checkedOptionsArr = [];

  radioButtonsMaxPrepTime.forEach((radio) => {
    if (radio.checked) {
      checkedOptionsArr.push(radio.value);
    } else {
      checkedOptionsArr.push(99);
    }
  });

  return checkedOptionsArr;
}

function gatherCookTimes() {
  let checkedOptionsArr = [];
  radioButtonsMaxCookTime.forEach((radio) => {
    if (radio.checked) {
      checkedOptionsArr.push(radio.value);
    } else {
      checkedOptionsArr.push(99);
    }
  });
  return checkedOptionsArr;
}

function gatherSearchInput() {
  return searchInput.value;
}

function searchData() {
  const cookTimes = gatherCookTimes(); //array
  const prepTimes = gatherPrepTimes(); //array
  const searchInput = gatherSearchInput(); //string

  //!delete the current cards - remember this

  const currentCards = []; //our array of recipe objects that each step dumps info into

  // * The Search Input Step
  if (!searchInput) {
    data.forEach((recipe) => {
      currentCards.push(recipe);
    });
  } else {
    console.log("happened");
    data.forEach((recipe) => {
      let title = recipe.title.toLowerCase();
      let ingredients = recipe.ingredients.map((element) =>
        element.toLowerCase(),
      );

      if (
        title.includes(searchInput.toLowerCase()) ||
        ingredients.some((i) => i.includes(searchInput.toLowerCase()))
      ) {
        // console.log(recipe);
        currentCards.push(recipe);
      }
    });
  }

  const updatedCookTimes = cookTimes.map((time) => Number(time));
  const updatedPrepTimes = prepTimes.map((time) => Number(time));

  // * The Cook Time  //* The Prep Time

  const updatedCards = currentCards.filter((card) => {
    return (
      updatedCookTimes.includes(card.cookMinutes) ||
      updatedPrepTimes.includes(card.prepMinutes)
    );
  });

  //! If there are not radio options selected it will create an empty array
  console.log(updatedCards);

  //! This checks for the empty array and uses the proper array ‼️
  if (updatedCards.length === 0) {
    currentCards.forEach((card) => {
      cardBuilder(card);
    });
  } else {
    updatedCards.forEach((card) => {
      cardBuilder(card);
    });
  }
}

// searchData("salt");

// 1. Image - based on the screen width
// 2. Title - (not the slug)
// 3. Overview
// 4. Servings
// 5. Prep Minutes
// 6. Cook Minutes
// 4. */

// hamburger setup
hamburgerContainer.addEventListener("click", (e) => {
  //show dropdown menu
});
