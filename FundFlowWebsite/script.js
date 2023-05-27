"use strict";

///////////////////////////////////////
// Selectors
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
///////////////////////////////////////

///////////////////////////////////////
// Helpers:
// 1-

///////////////////////////////////////
// Sign-up Modal Helpers and Actions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Attaching event listeners to all btns
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
///////////////////////////////////////

///////////////////////////////////////
// Scrolling Into the "Learn More" section:

// Selection
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const allNav = document.querySelector(".nav");
const operations = document.querySelectorAll(".operations__tab");
const operationsTabLayout = document.querySelector(
  ".operations__tab-container"
);
const operationsTabContent = document.querySelectorAll(".operations__content");
// Event Handling
btnLearnMore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page Nav and Attaching event listeners to the nav bar

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // apply the scrollIntoView() method onto whatever the target/child triggered the event
  if (e.target.classList.contains("nav__link")) {
    const section = e.target.getAttribute("href");
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
  }
});
///////////////////////////////////////

///////////////////////////////////////
// Tabs component - Operations
operationsTabLayout.addEventListener("click", function (e) {
  e.preventDefault();
  // find the closest parent of type ".operations__tab" the button selected
  const chosenTab = e.target.closest(".operations__tab");

  // In case that they clicked on the bar but not on the tab,
  // chosenTab would be null cuz there wouldnt be a parent of type
  // operations__tab - in that case, return
  if (!chosenTab) return;

  // Deactivate all buttons
  operations.forEach((t) => t.classList.remove("operations__tab--active"));
  // activate the chosen button
  chosenTab.classList.add("operations__tab--active");

  // Show the corresponding content
  operationsTabContent.forEach((t) =>
    t.classList.remove("operations__content--active")
  );

  const contentIndex = chosenTab.dataset.tab;
  document
    .querySelector(`.operations__content--${contentIndex}`)
    .classList.add("operations__content--active");
});

// Fading animation in menu options
// function to change opacity of "features"
function changeOpacity(e) {
  if (e.target.classList.contains("nav__link")) {
    const chosenFeature = e.target;
    // Go up to a parent, select all the "features" in the nav bar
    const siblings = chosenFeature
      .closest(".nav")
      .querySelectorAll(".nav__link");
    // select the logo
    const logo = chosenFeature.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling != chosenFeature) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

allNav.addEventListener("mouseover", changeOpacity.bind(0.5));
allNav.addEventListener("mouseout", changeOpacity.bind(1));

const coordsToSwitchBar = section1.getBoundingClientRect();
const header = document.querySelector(".header");
const allNavHeight = allNav.getBoundingClientRect().height;
const stickyToggle = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? allNav.classList.add("sticky")
    : allNav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyToggle, {
  root: null,
  threshold: 0,
  rootMargin: `-${allNavHeight}px`,
});

headerObserver.observe(header);
///////////////////////////////////////

///////////////////////////////////////
// Sections showing as user is scrolling
// Select all sections
const allSections = document.querySelectorAll(".section");

// Set the callback function for the observer
const revealSection = function (entries, observer) {
  const [entry] = entries; // entry object
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserve.unobserve(entry.target);
};

// Set up the intended observer, pass in the callback function
const sectionObserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
// Attach an observer to all sections
allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserve.observe(section);
});

// Lazy Loading Images
const allImgs = document.querySelectorAll("img[data-src]");

function lazyImgFunction(entries, obs) {
  const [entry] = entries;

  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  imgObserver.unobserve(entry.target);
  // console.log(entry.target);
}

const imgObserver = new IntersectionObserver(lazyImgFunction, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

allImgs.forEach((img) => imgObserver.observe(img));
