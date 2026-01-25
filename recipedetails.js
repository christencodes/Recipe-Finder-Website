"use strict";

// NAV THINGS
//*NAV Variables
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");
const heroImage = document.getElementById("hero-img");

const dropdown = document.querySelector(".dropdown");
// hamburger setup
hamburgerContainer.addEventListener("click", (e) => {
  console.log("hello");
  dropdown.classList.toggle("hide-me");
});

window.addEventListener("resize", (e) => {
  if (window.screen.width > 768) {
    dropdown.classList.add("hide-me");
  }
});

//!--------------------------------------------

console.log(window.location);

const params = new URLSearchParams(window.location.search);
console.log(params.get("title"));

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

function dataTitleSearch(title) {
  return data.filter((recipe) => recipe.title === title);
}

const [currentRecipe] = [...dataTitleSearch(params.get("title"))];

// Function to populate the list

const recipeImage = document.getElementById("recipe-image");
const recipeTitle = document.getElementById("recipe-title");
const recipeOverview = document.getElementById("recipe-overview");
const recipeServings = document.getElementById("recipe-servings");
const recipePrep = document.getElementById("recipe-prep-minutes");
const recipeCook = document.getElementById("recipe-cook-minutes");
const ingredientList = document.querySelector(".ingredient-list");
const instructionList = document.querySelector(".instruction-list");

// ? Need to create a function for both lists

function populateRecipeInformation() {
  recipeImage.src = currentRecipe.image.large;
  recipeTitle.textContent = currentRecipe.title;
  recipeOverview.textContent = currentRecipe.overview;
  recipeServings.textContent += `: ${currentRecipe.servings}`;
  recipePrep.textContent += `: ${currentRecipe.prepMinutes} mins`;
  recipeCook.textContent += `: ${currentRecipe.cookMinutes} mins`;

  populateIngredientList(currentRecipe);
  populateInstructions(currentRecipe);
}

function populateIngredientList(recipe) {
  recipe.ingredients.forEach((ingredient) => {
    ingredientList.innerHTML += `<li class="ingredient-item text-preset-6"><img src="/assets/images/icon-bullet-point.svg" alt="" />${ingredient}</li>`;
  });
}

function populateInstructions(recipe) {
  currentRecipe.instructions.forEach((instruction) => {
    instructionList.innerHTML += `<li class="ingredient-item text-preset-6"><img src="/assets/images/icon-bullet-point.svg" alt="" />${instruction}</li>`;
  });
}

populateRecipeInformation();

console.log(currentRecipe);

// Recipe Cards
