const weightValueEl = document.querySelector(".log__weight-value");
const weightSliderEl = document.querySelector(".log__slider");
const waterTargetEl = document.querySelector(".log__water--target");
const waterDrankEl = document.querySelector(".log__water--drank");
const cupSizeEl = document.querySelectorAll(".log__cup-size");
const cupsEl = document.querySelector(".log__cups");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const activeCup = document.querySelector(".active-cup");
const popupContainer = document.querySelector(".log__popup-container");
const overlay = document.querySelector(".log__overlay");
const cupSelecor = document.querySelector(".log__select-container");
const guageFill = document.querySelector(".guage__fill");

// Calculating water target
let waterTarget = 2500;
const calcWaterTarget = function () {
  waterTarget = Math.trunc(((weight * (2 / 3)) / 33.8) * 1000);
  waterTargetEl.textContent = `/ ${waterTarget} ml`;
};

// Calculating water drank
let waterDrank = 0;
let upto = 0;
let rotation = 0;
const calcWaterDrank = function (e) {
  waterDrank += Number(e.target.dataset.size);
  rotation += 180 / (waterTarget / Number(e.target.dataset.size));
  if (waterDrank > waterTarget) {
    guageFill.style.transform = `rotate(${180}deg)`;
  } else {
    guageFill.style.transform = `rotate(${rotation}deg)`;
  }

  let counts = setInterval(updated, 0.1);
  function updated() {
    waterDrankEl.textContent = `${upto++} `;
    if (upto > waterDrank) {
      clearInterval(counts);
    }
  }
};
activeCup.addEventListener("click", calcWaterDrank);

// Getting user weight
let clicked = false;
let weight;

const userWeight = function (e) {
  weightSliderEl.addEventListener("mouseup", () => (clicked = false));
  weightSliderEl.addEventListener("mousedown", () => (clicked = true));
  if (clicked) {
    weight = weightSliderEl.value;
    weightValueEl.textContent = weight;
    calcWaterTarget();
  }
};

weightSliderEl.addEventListener("mousemove", userWeight);

// const waterAmount = [355, 655, 203, 301, 4043, 509];

// let counter = 0;
// const cupSize = function () {
//   cupsEl.style.transform = `translateX(-${counter}%)`;
//   counter = counter + 33.3;
// };

// waterAmount.forEach((amount, i) => {
//   let cupSize = document.createElement("button");
//   cupSize.setAttribute("class", "log__cup-size");
//   if (i === 1) cupSize.setAttribute("class", "active-cup");
//   cupSize.textContent = `${amount}ml`;
//   cupsEl.append(cupSize);
// });

// rightArrow.addEventListener("click", cupSize);

const cancelBtn = document.querySelector(".log__popup-cancel");
const okBtn = document.querySelector(".log__popup-ok");
const cups = document.querySelectorAll(".log__popup-cup");

let selectedCup;
cups.forEach((cup) => {
  cup.addEventListener("click", (e) => {
    selectedCup = cup.dataset.size;
  });
});

const closePopup = function (e) {
  if (e.target.textContent === "Ok") {
    activeCup.textContent = `${selectedCup}ml`;
    activeCup.dataset.size = selectedCup;
  }
  overlay.style.display = "none";
  popupContainer.style.display = "none";
};

const openPopup = function (e) {
  overlay.style.display = "block";
  popupContainer.style.display = "block";
};

cancelBtn.addEventListener("click", closePopup);
okBtn.addEventListener("click", closePopup);
cupSelecor.addEventListener("click", openPopup);
