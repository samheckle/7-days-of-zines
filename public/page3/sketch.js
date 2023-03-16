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
let circles = []

class Circ {
  constructor(x, y, d){
    this.x = x
    this.y = y
    this.d = d
    this.speed = random(-2, 2)
  }
}

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

  // translate(width / 2, height / 2);
  if (vertical) {
    // scale(.5)
    rotate(PI / 2);
  }
  // console.log(firstClick)
  drawCircle(width/2, height/2, radius);

  console.table(circles)
  // frameRate(10)
}

let x = 0;
function draw() {
  background(0)

  for (let i =0; i< circles.length;i++){
    // if(vertical){
    //   circles[i].x++

    // }
    circles[i].x += circles[i].speed
    if(circles[i].x > width-(circles[i].d/2) || circles[i].x < circles[i].d/2){
      circles[i].speed *= -1
    } 
    
    // translate(width / 2, height / 2);
    // console.log(circles[i].x)
    ellipse(circles[i].x, height/2, circles[i].d)
  }

  // x++;

  // ellipse(x,0, 300)
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  circles.push(new Circ(x, y, d))
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
