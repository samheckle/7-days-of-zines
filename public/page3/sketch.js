// intro text
window.onload = () => {
  const clickable = document.getElementById("clickable");

  const text1 = document.getElementById("page3-text");
  const text2 = document.getElementById("page3-text2");

  text2.style.display = "none";

  clickable.addEventListener("click", () => {
    if (text2.style.display == "none") {
      text1.style.display = "none";
      text2.style.display = "block";
    } else {
      const main = document.getElementById("main");
      clickable.classList.add("hidden");
      main.classList.remove("hidden");
      main.classList.add("visible");
    }
  });
};

let vertical = false;
let firstClick = true;

// p5 sketch
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let radius = height;
  if (window.innerWidth < window.innerHeight) {
    vertical = true;
    radius = width;
  }

  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();

  translate(width / 2, height / 2);
  if (vertical) {
    // scale(.5)
    rotate(PI / 2);
  }
  // console.log(firstClick)
  drawCircle(0, 0, radius);
}

function draw() {}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 2) {
    let newD = d * 0.5;
    drawCircle(x + newD, y, newD);
    drawCircle(x - newD, y, newD);
  }
}

let numClick = 0;
function mousePressed() {
  if (!firstClick) {
    if (!vertical) {
      textSize(36);
    } else {
      textSize(24);
    }
    fill(255, 0, 0);
    text("fuck you", mouseX, mouseY);
  }
  // else firstClick = false
}

function mouseReleased() {
  console.log(firstClick);
  if (firstClick) {
    numClick++;
  }
  if ((vertical && numClick >= 4) || (!vertical && numClick >= 2)) {
    firstClick = false;
  }
}
