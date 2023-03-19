window.onload = () => {
  const main = document.getElementById("main");
  clickable.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("visible");
};
let dystopia;
let utopia;
// generated from chat gpt
const backgroundText =
  "Queer utopias in anti-patterns explore the possibility of creating alternative societies that reject heteronormativity and embrace queer identities and experiences. Anti-patterns are patterns of behavior or design that lead to negative outcomes, and queer utopias in anti-patterns challenge the dominant heteronormative structures that perpetuate exclusion and oppression. These utopias imagine new possibilities for social organization and seek to create a world where diverse identities and desires can flourish. The ephemeral nature of heteronormativity refers to the idea that the dominant cultural norms around gender and sexuality are not fixed or immutable, but rather constantly shifting and evolving. Queer utopias in anti-patterns recognize that heteronormativity is not a natural or inevitable state of being, but rather a social construct that can be challenged and transformed. By embracing the ephemeral nature of heteronormativity, these utopias reject the idea that there is a single, fixed way to be queer or to resist heteronormative norms. Overall, queer utopias in anti-patterns offer a powerful vision of a world where difference is celebrated and diversity is valued. By imagining new possibilities for social organization and challenging the dominant cultural norms around gender and sexuality, these utopias offer a glimpse of a future where all individuals can live and love freely and without fear of discrimination or exclusion.";

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  background(255);
  dystopia = new TextPoint("dystopia");
  utopia = new TextPoint("utopia");

  let queer = new TextPoint("queer");
  let pattern = new TextPoint("anti-pattern");
  let no_place = new TextPoint("no place");

  let searchedWords = ["utopia", "queer", "anti-pattern"]

  textSize(20);
  textFont("monospace", 20);

  let charWidth = textWidth("-");
  let widthCharRow = window.innerWidth / charWidth;
  let prevStr = 0;
  let row = 0;
  let rowIndexChar = 0;
  let rowWords = [];

  for (let i = 0; i < backgroundText.length - 1; i++) {
    if (
      backgroundText[i] == " " &&
      textWidth(backgroundText.substring(rowIndexChar, i + 1)) >
        window.innerWidth
    ) {
      rowWords[row] = backgroundText.substring(rowIndexChar, i);
      let strWidth = textWidth(
        rowWords[row].substring(0, rowWords[row].length)
      );

      rowIndexChar = i;

      let indexSpace = 1;
      while (rowWords[row].charAt(rowWords[row].length - indexSpace) != " ") {
        indexSpace++;
        rowIndexChar--;
      }
      rowWords[row] = rowWords[row].slice(0, rowWords[row].length - indexSpace);

      row++;
    } else if (i == backgroundText.length - 2) {
      rowWords[row] = backgroundText.substring(rowIndexChar);
    }
  }

  let locations = [];
  for(let j = 0; j < searchedWords.length; j++){
    locations[j] = []
    for (let i = 0; i < rowWords.length; i++) {
      let words = rowWords[i].split(" ");
      let loc = {
        skipRow: false,
        numChars: 0,
      };
      let numChars = 0;
      words.forEach((word) => {
        if (word.toLowerCase().includes(searchedWords[j])) {
          loc.skipRow = false;
          loc.numChars = numChars;
        }
        numChars += textWidth(word + " ");
      });
  
      if (rowWords[i].toString().toLowerCase().includes(searchedWords[j])) {
        loc.skipRow = false;
        locations[j].push(loc);
      } else {
        loc.skipRow = true;
        locations[j].push(loc);
      }
    }
  }

  let displayedWords = []

  for (let i = 0; i < locations.length; i++) {
    for(let j = 0; j < locations[i].length; j++){
      push();
      fill(color(0, 255, 0));
      if (!locations[i][j].skipRow) {
        text(searchedWords[i], locations[i][j].numChars, ((j+1)*textLeading())-(textLeading()/2)+2);
        // displayedWords.push(new TextPoint(searchedWords[i], locations[i][j].numChars, ((j+1)*textLeading())-(textLeading()/2)+2))
      }
      pop();
    }
  }

  push();
  fill(color(0, 0, 0, 50));
  text(backgroundText, 0, 0, window.innerWidth, window.innerHeight);
  pop();

  dystopia.connect(utopia.ellipseX, utopia.ellipseY, color(255, 0, 0));
  queer.connect(pattern.ellipseX, pattern.ellipseY);
  pattern.connect(dystopia.ellipseX, dystopia.ellipseY);
  utopia.connect(no_place.ellipseX, no_place.ellipseY);

  dystopia.draw();
  utopia.draw();
  queer.draw();
  pattern.draw();
  no_place.draw();

  frameRate(15);
}
let offX = 0.0;
let offY = 0.0;

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

function mousePressed() {
  noLoop();
}

class TextPoint {
  constructor(t) {
  // constructor(t, x, y){
    this.text = t;

    this.fontSize = 20;
    this.tWidth = textWidth("-") * this.text.length;

    this.x = random(0, window.innerWidth - this.text.length * 2);
    this.y = random(this.fontSize, window.innerHeight - this.fontSize);
    // this.x = x
    // this.y = y

    this.radius = 10;
    this.offset = 5;

    this.ellipseX = this.x + this.tWidth / 4 + this.radius / 2;
    this.ellipseY = this.y + this.radius / 2 + this.offset;

    this.newEllipseX = this.x;
    this.newEllipseY = this.y;
  }
  draw() {
    push();

    fill(0);
    translate(this.x, this.y);
    push();
    fill(255);
    strokeWeight(0);
    rotate(PI);
    rect(-this.tWidth / 2, -this.offset + 1, this.tWidth / 2, this.fontSize);
    pop();
    textSize(this.fontSize);
    let t = text(this.text, 0, 0);

    push();

    fill(255);
    stroke(0);
    strokeWeight(2);
    // this.ellipseX = tWidth/2 + radius/2
    // this.ellipseX = thistWidth/2
    // this.ellipseY = 10
    ellipse(this.ellipseX - this.x, this.ellipseY - this.y, this.radius);

    pop();
    pop();
  }
  connect(x, y, color) {
    push();
    stroke(0);
    if (color) {
      stroke(color);
    }
    strokeWeight(2);
    line(this.ellipseX, this.ellipseY, x, y);
    pop();
  }
  move(x, y) {
    let newX = this.x * x;
    let newY = this.y * y;

    this.newEllipseX = newX + this.tWidth / 4 + this.radius / 2;
    this.newEllipseY = newY + this.radius / 2 + this.offset;

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
