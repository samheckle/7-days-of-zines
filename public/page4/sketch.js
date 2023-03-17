window.onload = () => {
  const main = document.getElementById("main");
  clickable.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("visible");
};
let dystopia
let utopia
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);


  background(255);
  dystopia = new TextPoint("dystopia", 50, 50);
  utopia = new TextPoint("utopia", 500, 500);
  
  let queer = new TextPoint("queer", 450, 150);
  let pattern = new TextPoint("anti-pattern", 150, 450);

  dystopia.connect(utopia.ellipseX, utopia.ellipseY)
  queer.connect(pattern.ellipseX, pattern.ellipseY)
  pattern.connect(dystopia.ellipseX, dystopia.ellipseY)

  dystopia.draw();
  utopia.draw();
  queer.draw()
  pattern.draw()

  frameRate(15)
}
let offX = 0.0;
let offY = 0.0

function draw() {

//   background(255);
//     offX += .2
//     offY += .3
//     let noiseX = noise(offX)
//     let noiseY = noise(offY)
//     dystopia.move(noiseX, noiseY)
//     utopia.move(noiseX, noiseY)
//     dystopia.connect(utopia.newEllipseX, utopia.newEllipseY)
    // console.log('off ' + off + ' noise ' + dystopia.x)
}

function mousePressed(){
    noLoop()
}

class TextPoint {
  constructor(t, x, y) {
    this.text = t;
    this.x = x;
    this.y = y;


    this.fontSize = 20
    this.tWidth = (this.text.length-1)*this.fontSize

    this.radius = 10
    this.offset = 5

    this.ellipseX = x + this.tWidth/4 + this.radius/2;
    this.ellipseY = y + this.radius/2 + this.offset

    this.newEllipseX = x
    this.newEllipseY = y
  }
  draw() {
    push()

    fill(0);
    translate(this.x, this.y)
    push()
    fill(255)
    strokeWeight(0)
    rotate(PI)
    rect(-this.tWidth/2, -this.offset+1, this.tWidth/2, this.fontSize)
    pop()
    textSize(this.fontSize)
    let t = text(this.text, 0, 0);

    push()

    fill(255)
    stroke(0)
    strokeWeight(2)
    // this.ellipseX = tWidth/2 + radius/2
    // this.ellipseX = thistWidth/2
    // this.ellipseY = 10
    ellipse(this.ellipseX - this.x, this.ellipseY - this.y, this.radius);

    pop()
    pop()

  }
  connect(x, y){
    push()
    fill(255)
    stroke(0)
    strokeWeight(2)
    line(this.ellipseX, this.ellipseY, x, y)
    pop()
  }
  move(x, y){

    let newX = this.x * x
    let newY = this.y * y

    this.newEllipseX = newX + this.tWidth/4 + this.radius/2;
    this.newEllipseY = newY + this.radius/2 + this.offset

    let t = text(this.text, newX, newY);

    ellipse(this.newEllipseX, this.newEllipseY, this.radius);

    // line(newEllipseX, this.ellipseY, x, y)

    // this.x += x
    // this.y += y

    // if(this.x >= this.originalX + 10 || this.x <= this.originalX - 10){
    //     this.x = this.originalX
    // } 
    // if(this.y >= this.originalY + 10 || this.y <= this.originalY -10){
    //     this.y = this.originalY
    // }
  }
}
