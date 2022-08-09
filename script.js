const weightValueEl = document.querySelector(".log__weight-value");
const weightSliderEl = document.querySelector(".log__slider");
const waterTargetEl = document.querySelector(".log__water--target");
const waterDrankEl = document.querySelector(".log__water--drank");
const cupSizeEl = document.querySelectorAll(".log__cup-size");
const cupsEl = document.querySelector(".log__cups");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const activeCup = document.querySelector(".log__cup-size");

const guageFill = document.querySelector(".guage__fill");
const cupSelecorEl = document.querySelector(".log__select-container");

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

const cupsContainer = document.querySelector(".log__popup-cups");
// let cups = document.querySelectorAll(".log__popup-cup");
const cancelBtn = document.querySelector(".log__popup-btn--cancel");
const okBtn = document.querySelector(".log__popup-btn--ok");
const popupContainer = document.querySelector(".log__popup-container");
const overlay = document.querySelector(".log__overlay");

const cupSizes = [100, 125, 150, 175, 200, 300, 400, 500, "customise"];

let cups, cupsShadow, cupsImg, cupsSizeText, selectedCup;

const createPopupCups = function () {
  cupSizes.forEach((cupSize) => {
    let html = `
            <div class="log__popup-cup" data-size="${cupSize}">
              <img src="./images/cup-${cupSize}.svg " alt="" />
              <div class="log__popup-shadow"></div>
              <p>${cupSize} ml</p>
            </div>`;
    cupsContainer.insertAdjacentHTML("beforeend", html);
  });
  cups = document.querySelectorAll(".log__popup-cup");
  cupsShadow = document.querySelectorAll(".log__popup-shadow");
  cupsImg = document.querySelectorAll(".log__popup-cup img");
  cupsSizeText = document.querySelectorAll(".log__popup-cup p");
  console.log(cups);
};

const selectCup = function () {
  cups.forEach((cup, i) => {
    cup.addEventListener("click", (e) => {
      selectedCup = cup.dataset.size;
      cupsImg.forEach((img) => (img.style.transform = "translateY(0)"));
      cupsShadow.forEach((shadow) => (shadow.style.opacity = "0"));
      cupsSizeText.forEach((text) => (text.style.color = "#000"));
      cupsImg[i].style.transform = "translateY(-10px)";
      cupsShadow[i].style.opacity = "1";
      cupsSizeText[i].style.color = "#0094ff";
    });
  });
};

const closePopup = function (e) {
  overlay.style.display = "none";
  popupContainer.style.display = "none";

  if (e.target.textContent === "Ok") {
    activeCup.textContent = `${selectedCup} ml`;
    activeCup.dataset.size = selectedCup;
  }
};

const openPopup = function () {
  overlay.style.display = "block";
  popupContainer.style.display = "block";
};

cancelBtn.addEventListener("click", closePopup);

okBtn.addEventListener("click", closePopup);

overlay.addEventListener("click", closePopup);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup(e);
});

cupSelecorEl.addEventListener("click", (e) => {
  openPopup(e);
  cupsContainer.textContent = "";
  createPopupCups(e);
  selectCup();
});

// trying
// const cupps = [50, 100, 150, 200, 250, 300];
// const right = document.querySelector(".right");
// const left = document.querySelector(".left");
// const tryCups = document.querySelector(".try-cups");
// // console.log(tryCups);
// let counter = 0;
// cupps.forEach((cupp, i) => {
//   let cup = document.createElement("span");
//   cup.setAttribute("class", "cupp");
//   if (i === counter) cup.setAttribute("class", "cupp active-cupp");
//   cup.textContent = cupp;
//   tryCups.append(cup);
// });

// let firstNode = tryCups.childNodes[0].cloneNode(true);
// let lastNode = tryCups.childNodes[cupps.length - 1].cloneNode(true);
// firstNode.id = "firstNode";
// lastNode.id = "lastNode";
// tryCups.prepend(lastNode);
// tryCups.append(firstNode);

// const move = function () {
//   let allCups = document.querySelectorAll(".cupp");
//   if (counter < cupps.length) {
//     counter++;
//   } else {
//     counter = 1;
//   }
//   allCups.forEach((cup) => {
//     cup.classList.remove("active-cupp");
//     cup.style.transform = `translateX(-${counter * 100}%)`;
//   });

//   allCups[counter + 1].classList.add("active-cupp");
// };

// const move2 = function () {
//   let allCups = document.querySelectorAll(".cupp");
//   if (counter > 0) {
//     counter--;
//   } else {
//     counter = cupps.length - 1;
//   }
//   allCups.forEach((cup) => {
//     cup.classList.remove("active-cupp");
//     cup.style.transform = `translateX(-${(counter - 1) * 100}%)`;
//   });

//   allCups[counter].classList.add("active-cupp");
// };

// tryCups.addEventListener("transitionend", () => {
//   console.log(tryCups.childNodes[counter + 1].id);
//   if (tryCups.childNodes[counter + 1].id === "firstNode") {
//     console.log("yes");
//     tryCups.childNodes.forEach((cup) => (cup.style.transition = "none"));
//   }
// });

// right.addEventListener("click", move);
// left.addEventListener("click", move2);
