`use strict`;
const navLinksDiv = document.querySelector(".nav-links");
const navButton = document.getElementById("nav-button");
const hamburgerContainer = document.querySelector(".hamburger-container");

const tablet = 768;
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
    return null;
  }
  navLinksDiv.classList.remove("hide-me");
  navButton.classList.remove("hide-me");
  hamburgerContainer.classList.add("hide-me");
}
