"use strict";
const { log } = console;
const buttons = document.querySelectorAll(".btn");
const mainSection = document.getElementById("main");
const myNumber = document.getElementById("num");
const myColor = document.getElementById("range");
const myPenCil = document.querySelector(".pencil");

const valueNumber = (getNumber) => Number(getNumber.value);
const valueColor = (getColor) => String(getColor.value);

let k = 1;
let zal = 1;
let colText = 1;
let cleaner = 1;
const activeBtn = (e) => {
  e.target.classList.toggle("active");
  switch (e.target.id) {
    case "pencil":
      k++;
      mainSection.style.cursor = "grab";
      if (k % 2 === 0) {
        mainSection.addEventListener("mousemove", penCil);
      } else {
        mainSection.removeEventListener("mousemove", penCil);
      }
      break;
    case "zalivka":
      zal++;
      mainSection.style.cursor = "grabbing";
      if (zal % 2 === 0) {
        mainSection.addEventListener("click", coverZaliv);
      } else {
        mainSection.removeEventListener("click", coverZaliv);
        mainSection.style.backgroundColor = "#fff";
      }
      break;
    case "text":
      colText++;
      mainSection.style.cursor = "text";
      if (colText % 2 === 0) {
        mainSection.addEventListener("click", showText);
      } else {
        mainSection.removeEventListener("click", showText);
      }
      break;
    case "clean":
      cleaner++;
      mainSection.style.cursor = "row-resize";
      if (cleaner % 2 === 0) {
        mainSection.addEventListener("mousemove", cleanPen);
      } else {
        mainSection.removeEventListener("mousemove", cleanPen);
      }
      break;
    case "triangle":
      mainSection.addEventListener("click", createTriangle);
      break;
    case "circle":
      mainSection.addEventListener("click", createCirlce);
      break;
    case "rectangle":
      mainSection.addEventListener("click", createRectangle);
      break;

    default:
      mainSection.removeEventListener("mousemove", penCil);
      mainSection.style.cursor = "auto";
  }
  log(e.target.classList.contains("pencil"));
};
buttons.forEach((elem) => {
  elem.addEventListener("click", activeBtn);
});

function penCil(e) {
  const elem = document.createElement("div");
  elem.style.width = valueNumber(myNumber) + "px";
  elem.style.height = valueNumber(myNumber) + "px";
  elem.style.backgroundColor = valueColor(myColor);
  elem.style.position = "absolute";
  elem.style.zIndex = -100;
  elem.style.top = e.y - 100 + "px";
  elem.style.left = e.x - 30 + "px";
  mainSection.append(elem);
}
function coverZaliv() {
  mainSection.style.backgroundColor = String(myColor.value);
}
const myElem = document.createElement("input");
myElem.classList.add("text-area");

function showText(e) {
  if (!e.target.classList.contains("text-area")) {
    myElem.style.left = e.x - 30 + "px";
    myElem.style.top = e.y - 100 + "px";
    mainSection.append(myElem);
  }
}
myElem.addEventListener("keydown", (e) => {
  log();
  if (e.key === "Enter") {
    const myText = document.createElement("span");
    myText.style.color = valueColor(myColor);
    myText.classList.add("my-text");
    myText.textContent = myElem.value;
    mainSection.append(myText);
    myElem.value = "";
    myElem.remove();
  }
});

myColor.addEventListener("input", () => {
  myPenCil.style.color = String(myColor.value);
});

mainSection.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  mainSection.removeEventListener("mousemove", penCil);
});

function cleanPen(e) {
  const elems = document.querySelector("#main div");
  return elems ? elems.remove() : null;
}

function createTriangle(e) {
  const myTriangle = document.createElement("div");
  myTriangle.style.width = valueNumber(myNumber) + "px";
  myTriangle.style.height = valueNumber(myNumber) + "px";
  myTriangle.style.border = `${valueNumber(myNumber)}px solid ${valueColor(
    myColor
  )}`;
  myTriangle.style.borderTopRightRadius = 20 + "px";
  myTriangle.style.backgroundColor = "transparent";
  myTriangle.style.position = "absolute";
  myTriangle.style.top = e.y - 100 + "px";
  myTriangle.style.left = e.x - 30 + "px";
  mainSection.append(myTriangle);
}
function createCirlce(e) {
  const myCircle = document.createElement("div");
  myCircle.style.width = valueNumber(myNumber) + "px";
  myCircle.style.height = valueNumber(myNumber) + "px";
  myCircle.style.borderRadius = `50%`;
  myCircle.style.backgroundColor = valueColor(myColor);
  myCircle.style.position = "absolute";
  myCircle.style.top = e.y - 100 + "px";
  myCircle.style.left = e.x - 30 + "px";
  mainSection.append(myCircle);
}

function createRectangle(e) {
  const myRectangle = document.createElement("div");
  myRectangle.style.width = valueNumber(myNumber) + "px";
  myRectangle.style.height = valueNumber(myNumber) + "px";
  myRectangle.style.border = `1px solid ${valueColor(myColor)}`;
  myRectangle.style.backgroundColor = `transparent`;
  myRectangle.style.position = "absolute";
  myRectangle.style.top = e.y - 100 + "px";
  myRectangle.style.left = e.x - 30 + "px";
  mainSection.append(myRectangle);
}
