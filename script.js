const weightValueEl = document.querySelector(".log__weight-value");
const weightSliderEl = document.querySelector(".log__slider");
const waterTargetEl = document.querySelector(".log__water--target");
const waterDrankEl = document.querySelector(".log__water--drank");
const waterAnimateEl = document.querySelector(".log__water--animate");
// const cupSizeEl = document.querySelector(".log__cup-size");
const cupsEl = document.querySelector(".log__cups");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const activeCup = document.querySelector(".log__cup-size");
const activeCupSpan = document.querySelector(".log__cup-size span");
const activeCupImg = document.querySelector(".log__cup-size img");

const guageFill = document.querySelector(".guage__fill");
const cupSelecorEl = document.querySelector(".log__select-container");
const cupsHistoryContainer = document.querySelector(".log__history-cups");

const customValueEl = document.querySelector(".log__custom-value");
const customCancelBtn = document.querySelector(".log__custom-btn--cancel");
const customOkBtn = document.querySelector(".log__custom-btn--ok");
const customCupContainer = document.querySelector(".log__custom-cup-container");
const waterWave1 = document.querySelector(".log__water-wave svg:first-child");
const waterWave2 = document.querySelector(".log__water-wave svg:nth-child(2)");

// Water facts
const waterFacts = {
  fact1: "Do not drink cold water or water with ice.",
  fact2: "Hold the water in your mouth for a while before swallowing.",
  fact3:
    "Drinking water in a sitting posture is better than in a standing or running position.",
  fact4: "Drink your glass of water slowly with some small sips.",
  fact5:
    "Do not drink cold water immediately after hot drinks like tea or coffee.",
  fact6: "Do not drink water immediately after eating.",
  fact7: "Water Helps Keep Skin Looking Good.",
  fact8:
    "By the time you feel thirsty, your body has lost more than 1 percent of its total water.",
  fact9:
    "Drinking enough water everyday can help reduce heart disease and cancer.",
  "watch-level":
    "Watch your intake. You are approaching near your daily required water intake level.",
  warning:
    "You are going over the limit. You are at a risk of getting Hyponatremia.",
  danger: {
    fact1:
      " Hyponatremia is also known as Water Toxicity, a condition in which sodium levels in the body are dangerously low.",
    fact2:
      "Hyponatremia can cause a host of physical symptoms ranging from confusion, nausea, and headaches.",
    fact3:
      "There are certain people who are more prone to hyponatremia than others.",
  },
};

// Calculating water target
let waterTarget = 2500;
const calcWaterTarget = function () {
  waterTarget = Math.trunc(((weight * (2 / 3)) / 33.8) * 1000);
  waterTargetEl.textContent = `/ ${waterTarget} ml`;
};

const animateWater = function () {
  waterAnimateEl.classList.add("log__animate-water");
  waterAnimateEl.addEventListener("animationend", () => {
    waterAnimateEl.classList.remove("log__animate-water");
  });
};

let cups, cupsShadow, cupsImg, cupsSizeText;
let selectedCup = 100;

const selectCup = function () {
  cups.forEach((cup, i) => {
    cup.addEventListener("click", (e) => {
      selectedCup = Number(cup.dataset.size);
      cupsImg.forEach((img) => (img.style.transform = "translateY(0)"));
      cupsShadow.forEach((shadow) => (shadow.style.opacity = "0"));
      cupsSizeText.forEach((text) => (text.style.color = "#000"));
      cupsImg[i].style.transform = "translateY(-10px)";
      cupsShadow[i].style.opacity = "1";
      cupsSizeText[i].style.color = "#00a9a5";
    });
  });
  activeCupSpan.textContent = `${selectedCup} ml`;
  activeCupImg.src = `./images/cup-${
    initialSizes.includes(selectedCup) ? selectedCup : "customise"
  }.svg`;
  activeCup.dataset.size = selectedCup;
};

// Calculating water drank
let waterDrank = 0;
let upto = 0;
let rotation = 0;
let rise = 0;
const calcWaterDrank = function (e) {
  rotation = ((waterDrank / waterTarget) * 100 * 180) / 100;
  rise = ((waterDrank / waterTarget) * 100 * 100) / 100;

  waterWave1.style.top = `${100 - rise}%`;
  waterWave2.style.top = `${100 - rise}%`;

  waterAnimateEl.textContent = `+${Number(
    e.target.dataset.size
  )} ml Well Done!`;
  if (rise > 100) rise = 100;
  else if (rise >= 70) {
    waterTargetEl.style.color = "#fff";
  } else if (rise >= 50) {
    waterDrankEl.style.color = "#66cbc9";
    waterTargetEl.parentElement.nextElementSibling.style.color = "#ddd";
  } else {
    waterTargetEl.style.color = "#272727";
    waterTargetEl.parentElement.nextElementSibling.style.color = "#272727";
  }
  if (waterDrank > waterTarget) {
    waterDrankEl.classList.add("log__pulse-water");
    guageFill.style.transform = `rotate(${180}deg)`;
  } else {
    guageFill.style.transform = `rotate(${rotation}deg)`;
    waterDrankEl.classList.remove("log__pulse-water");
  }
  waterDrankEl.textContent = `${waterDrank} `;
};

activeCup.addEventListener("click", (e) => {
  waterDrank += selectedCup;
  calcWaterDrank(e);
  animateWater();
});

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
const popupCancelBtn = document.querySelector(".log__popup-btn--cancel");
const popupOkBtn = document.querySelector(".log__popup-btn--ok");
const popupContainer = document.querySelector(".log__popup-container");
const overlay = document.querySelector(".log__overlay");

const cupSizes = [100, 125, 150, 175, 200, 300, 400, 500, "customise"];
const initialSizes = [...cupSizes];

const createPopupCups = function () {
  cupsContainer.textContent = "";
  cupSizes.forEach((cupSize) => {
    let html = `
            <div class="log__popup-cup" data-size="${cupSize}">
              <img src="./images/cup-${
                initialSizes.includes(cupSize) ? cupSize : "customise"
              }.svg " alt="" />
              <div class="log__popup-shadow"></div>
              <p> ${
                cupSize === "customise" ? "Customise" : `${cupSize} ml`
              } </p>
            </div>`;
    cupsContainer.insertAdjacentHTML("beforeend", html);
  });
  cups = document.querySelectorAll(".log__popup-cup");
  cupsShadow = document.querySelectorAll(".log__popup-shadow");
  cupsImg = document.querySelectorAll(".log__popup-cup img");
  cupsSizeText = document.querySelectorAll(".log__popup-cup p");
};

const openPopup = function (container) {
  overlay.classList.add("log__show-popup");
  container.classList.add("log__show-popup");
};

const closePopup = function (container) {
  overlay.classList.remove("log__show-popup");
  container.classList.remove("log__show-popup");
};

popupOkBtn.addEventListener("click", (e) => {
  selectCup();
  closePopup(popupContainer);
});

popupCancelBtn.addEventListener("click", (e) => {
  closePopup(popupContainer);
});

overlay.addEventListener("click", (e) => {
  closePopup(popupContainer);
  closePopup(customCupContainer);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup(popupContainer);
  }
});

cupSelecorEl.addEventListener("click", (e) => {
  openPopup(popupContainer);
  createPopupCups(e);
  selectCup();
});

customCancelBtn.addEventListener("click", (e) => {
  closePopup(customCupContainer);
  openPopup(popupContainer);
});

customOkBtn.addEventListener("click", (e) => {
  let val = Number(customValueEl.value);
  if (!cupSizes.includes(customValueEl.value && val))
    cupSizes.splice(cupSizes.length - 1, 0, val);

  selectedCup = val;
  closePopup(customCupContainer);
  closePopup(popupContainer);
  createPopupCups();
  selectCup();
  openPopup(popupContainer);
  popupContainer.style.top = "50%";
  customCupContainer.style.top = "60%"; // start work here
});

// Print Random Facts

const displayFacts = function () {
  const dropletMessageEl = document.querySelector(".log__droplet-message");
  const totalFacts = Object.keys(waterFacts).length - 3;
  let randomFact = Math.floor(Math.random() * totalFacts) + 1;

  if (waterDrank > waterTarget) {
    const dangerFactsLength = Object.keys(waterFacts.danger).length;
    let dangerFacts = Math.ceil(Math.random() * dangerFactsLength);
    dropletMessageEl.textContent = waterFacts.danger[`fact${dangerFacts}`];
  } else if (waterDrank >= waterTarget)
    dropletMessageEl.textContent = waterFacts[`warning`];
  else if (waterTarget - waterDrank <= 200)
    dropletMessageEl.textContent = waterFacts["watch-level"];
  else if (waterDrank < waterTarget)
    dropletMessageEl.textContent = waterFacts[`fact${randomFact}`];
};

activeCup.addEventListener("click", (e) => {
  let html = `
  <div class="log__history-cup-wrapper">
  <div class="log__history-cup">
  <img src="./images/cup-${
    initialSizes.includes(selectedCup) ? selectedCup : "customise"
  }.svg " alt="" />
  <span class="log__history-quantity">${selectedCup} ml</span>
    <span class="log__history-time">05:05PM</span>
    <span class="log__history-options">
      <i
        class="fa-solid fa-ellipsis-vertical log__history-icon"
      ></i>
    </span>
  </div>
  <div class="log__history-cta" data-size = "${selectedCup}">
    <span class="log__history-edit">Edit</span>
    <span class="log__history-delete">Delete</span>
  </div>
</div>`;

  cupsHistoryContainer.insertAdjacentHTML("afterbegin", html);
  displayFacts();
});

popupContainer.addEventListener("click", (e) => {
  if (e.target.dataset.size === "customise") {
    popupContainer.classList.remove("log__show-popup");
    popupContainer.style.top = "40%";
    customCupContainer.style.top = "50%";
    customCupContainer.classList.add("log__show-popup");
  }
});

cupsHistoryContainer.addEventListener("mouseenter", (e) => {
  const cupsHistoryIcons = document.querySelectorAll(".log__history-icon");
  const cupsHistoryCTA = document.querySelectorAll(".log__history-cta");
  cupsHistoryIcons.forEach((icon, i) => {
    icon.addEventListener("click", (e) => {
      cupsHistoryCTA.forEach((cta) => (cta.style.display = "none"));
      if (icon.classList.contains("log__history-icon")) {
        cupsHistoryCTA.forEach((cta, idx) => {
          if (i === idx) {
            cta.style.display = "flex";
            cta.addEventListener("click", (e) => {
              if (e.target.classList.contains("log__history-delete")) {
                e.stopImmediatePropagation();
                let deleted = Number(
                  e.target.closest(".log__history-cta").dataset.size
                );
                waterDrank -= deleted;
                calcWaterDrank(e);
                e.target.parentElement.parentElement.remove();
              }
            });
          }
        });
      }
    });
  });
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
