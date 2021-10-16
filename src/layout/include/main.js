const controls = document.querySelector(".controls");
const container = document.querySelector(".container");
const allBox = container.children;
// console.log(allBox);

const containerWidth = container.offsetWidth;
// console.log(containerWidth);
const margin = 60;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;
var allSlides = 0;
var currentActiveId = 0;

responsive = [
  { breakPoint: { width: 0, item: 1 } },
  { breakPoint: { width: 600, item: 2 } },
  { breakPoint: { width: 1000, item: 3 } },
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }
  //   console.log(items);

  start();
}

function start() {
  check();
  var totalItemsWidth = 0;
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].style.width = containerWidth / items - margin + "px";
    allBox[i].style.margin = margin / 2 + "px";
    totalItemsWidth += containerWidth / items;
    totalItems++;
  }
  container.style.width = totalItemsWidth + "px";

  allSlides = Math.ceil(totalItems / items);
  //   console.log(allSlides);
  const ul = document.createElement("ul");
  for (let i = 0; i < allSlides; i++) {
    const li = document.createElement("li");
    li.id = i;
    // li.innerHTML = i;
    li.setAttribute("onClick", "controlSlides(this)");
    ul.appendChild(li);
    if (i === 0) {
      li.className = "active";
    }
  }
  controls.appendChild(ul);
}

function controlSlides(ele) {
  currentActiveId = ele.id;
  check();
  // console.log(ele.id);
  // console.log("tuyen");
  const ul = controls.children;
  const li = ul[0].children;
  var active;
  for (let i = 0; i < li.length; i++) {
    if (li[i].className === "active") {
      active = i;
      li[i].className = "";
    }
  }
  ele.className = "active";

  var numb = currentActiveId - active;
  // console.log("active:" + active);
  // console.log("currentID :" + currentActiveId);
  jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
  container.style.marginLeft = -jumpSlideWidth + "px";
}

function prev() {
  if (currentActiveId > 0) {
    const ul = controls.children;
    const li = ul[0].children;
    // console.log(li);
    // console.log("currentID :" + currentActiveId);
    var active;
    for (let i = 0; i < li.length; i++) {
      if (li[i].className === "active") {
        active = i;
        li[i].className = "";
      }
    }
    // console.log(active);
    currentActiveId--;
    li[currentActiveId].className = "active";
    var numb = currentActiveId - active;
    jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
    container.style.marginLeft = -jumpSlideWidth + "px";
  }
  check();
}

function next() {
  if (currentActiveId < allSlides - 1) {
    const ul = controls.children;
    const li = ul[0].children;
    //   console.log(li);
    var active;
    for (let i = 0; i < li.length; i++) {
      if (li[i].className === "active") {
        active = i;
        li[i].className = "";
      }
    }
    currentActiveId++;
    li[currentActiveId].className = "active";
    // console.log("active:" + active);
    // console.log("currentID :" + currentActiveId);
    var numb = currentActiveId - active;
    jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
    container.style.marginLeft = -jumpSlideWidth + "px";
  }
  check();
}

function check() {
  if (currentActiveId == 0) {
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "block";
  }
  if (currentActiveId > 0 && currentActiveId < allSlides) {
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "block";
  }
  if (currentActiveId == allSlides - 1) {
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "none";
  }
}

load();
