let particles = [];

const radius = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight

const iterator = 30;

let noiseMin = 0.0;
let noiseMax = 0.0;
const offset = 0.5;

let img = [];

function preload() {
  // preload() runs once
  for (let i = 1; i <= 15; i++) {
    if (i / 10 >= 1) img.push(loadImage("page1/lnt/-" + i + ".png"));
    else img.push(loadImage("page1/lnt/-0" + i + ".png"));
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  imageMode(CENTER)
  angleMode(DEGREES)
  const main = document.getElementById("main")
  main.classList.remove("hidden")
  main.classList.add("visible")
}

function mousePressed() {
    // console.log(random(img))
    push()
    translate(0,0)

    rotate(random(-10, 10));
    if(window.innerWidth > 1025){
      image(random(img), mouseX, mouseY, 600,300)
    } else{
      image(random(img), mouseX, mouseY, 300,150)
    }
    pop()
  let minX = 0;
  let maxX = width;
  let minY = 0;
  let maxY = height;
  if (mouseX - radius > 0) {
    minX = mouseX - radius;
  }
  if (mouseX + radius < width) {
    maxX = mouseX + radius;
  }
  if (mouseY - radius > 0) {
    minY = mouseY - radius;
  }
  if (mouseY + radius < height) {
    maxY = mouseY + radius;
  }

  for (let i = minX; i < maxX; i += iterator) {
    for (let j = minY; j < maxY; j += iterator) {
      // if (dist(i, j, mouseX, mouseY) < radius) {
      particles.push(new Particle(i, j));
      // }
    }
  }
}

function draw() {
//   background(0);
  noiseMin = noise(offset);
  noiseMax = noise(offset);

  for (let particle of particles) {
    let force = createVector(noise(offset), noise(offset));
    particle.applyForce(force);
    particle.update();
    particle.show();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
  // noLoop();
}
