let css = `body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  .slider {
    width: 100%;
    float: left;
    overflow: hidden;
    position: relative;
    background-color: gray;
  }
  .slider .title {
    padding: 20px;
    font-size: 30px;
    font-weight: bold;
  }
  .slider .container {
    width: 100%;
    float: left;
    transition: margin 2s ease;
  }
  .slider .container .item {
    height: 250px;
    line-height: 250px;
    text-align: center;
    font-size: 50px;
    float: left;
  }
  .slider .controls {
    width: 100%;
    float: left;
    padding: 15px;
  }
  .slider .controls ul {
    display: block;
    text-align: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .slider .controls ul li {
    height: 20px;
    width: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 50%;
    margin: 4px;
    display: inline-block;
    line-height: 33px;
    cursor: pointer;
  }
  .slider .controls ul li.active {
    background-color: green;
  }
  .slider .prev {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 0;
    width: auto;
    padding: 25px 16px;
    margin-top: -22px;
    color: red;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: hotpink;
  }
  .slider .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    width: auto;
    padding: 25px 16px;
    margin-top: -22px;
    color: red;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: hotpink;
  }
  
  .prev:hover,
  .next:hover {
    background-color: green;
  }`;
let html = `<div class="slider">
      <div class="title">Title</div>
      <div class="container">
          <div class="item"><img src="./src/images/plant.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant2.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant3.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant4.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant5.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant6.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant7.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant8.png" width="100%" height="100%">
          </div>
          <div class="item"><img src="./src/images/plant9.png" width="100%" height="100%">
          </div>
      </div>
      <a id="prev" class="prev" onclick="prev()">&#10094;</a>
      <a id="next" class="next" onclick="next()">&#10095;</a>
      <!-- control slides -->
      <div class="controls">
      </div>
  </div>`;
// document.write(`<style>${css}</style>${html}`);
// document.write(`<style>${css}</style><div style="width:600px; margin:0 auto;">
// ${html}
//    </div>`);
var result = document.getElementById("test");
result.innerHTML = "";
result.innerHTML = `<style>${css}</style>${html}`;

const controls = document.querySelector(".controls");
const container = document.querySelector(".container");
// const prev = document.getElementsByClassName("prev");
// const next = document.querySelector(".next");
const allBox = container.children;
// console.log(allBox);

const containerWidth = container.offsetWidth;
// console.log(containerWidth);
const margin = 60;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;
var currentActiveId = 0;
var allSlides = 0;

responsive = [
  { breakPoint: { width: 0, item: 1 } },
  { breakPoint: { width: 600, item: 2 } },
  { breakPoint: { width: 1000, item: 3 } },
];

function load() {
  // check();
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
    console.log(li);
    console.log("currentID :" + currentActiveId);
    var active;
    for (let i = 0; i < li.length; i++) {
      if (li[i].className === "active") {
        active = i;
        li[i].className = "";
      }
    }
    console.log(active);
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
    console.log("active:" + active);
    console.log("currentID :" + currentActiveId);
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

// result.innerHTML = `Xin chao`;
