`use strict`;
//*HELPER Variables
const tablet = 769;
const mobile = 375;

//*NAV Variables
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");
const heroImage = document.getElementById("hero-img");

//*--------------------------------------

//* EVENT LISTENERS
// window.addEventListener("resize", (e) => {
//   // e.preventDefault();
//   // console.log(window.screen.width);
//   tabletAdjust();
// });

// //*HELPER FUNCTIONS

// function tabletAdjust() {
//   if (window.screen.width <= tablet) {
//     // navLinksDiv.classList.add("hide-me");
//     // navButton.classList.add("hide-me");
//     // hamburgerContainer.classList.remove("hide-me");
//     //!Hero
//     heroImage.src = "/assets/images/image-home-hero-small.webp";
//     return;
//   }
//   navLinksDiv.classList.remove("hide-me");
//   navButton.classList.remove("hide-me");
//   hamburgerContainer.classList.add("hide-me");
//   //!Hero
//   // heroImage.src = "/assets/images/image-home-hero-large.webp";
// }

//? JSON Data

//? Card Template

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
