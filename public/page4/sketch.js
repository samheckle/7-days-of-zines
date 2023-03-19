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

let displayedWords = [];
let fullTextHeight = 0;

function setup() {
  textSize(20);
  textFont("monospace", 20);
  let charHeight = textLeading() + textDescent();

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

  fullTextHeight = charHeight * rowWords.length

  createCanvas(window.innerWidth, fullTextHeight);

  textSize(20);
  textFont("monospace", 20);

  background(255);

  let searchedWords = ["utopia", "queer", "anti-pattern"];

  let locations = [];
  let wordDataArray = [];
  for (let j = 0; j < searchedWords.length; j++) {
    locations[j] = [];
    let wordData = {
      word: "",
      numWords: 0,
    };
    wordData.word = searchedWords[j];
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
          wordData.numWords++;
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
    wordDataArray.push(wordData);
  }

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[i].length; j++) {
      push();
      fill(color(0, 255, 0));
      if (!locations[i][j].skipRow) {
        // text(searchedWords[i], locations[i][j].numChars, ((j+1)*textLeading())-(textLeading()/2)+2);
        displayedWords.push(
          new TextPoint(
            searchedWords[i],
            locations[i][j].numChars,
            (j + 1) * textLeading() - textLeading() / 2 + textDescent() * 0.6
          )
        );
      }
      pop();
    }
  }

  push();
  fill(color(0, 0, 0, 50));
  text(backgroundText, 0, 0, window.innerWidth, fullTextHeight);
  pop();

  for (let j = 0; j < wordDataArray.length; j++) {
    for (let i = 0; i < displayedWords.length; i++) {
      if (displayedWords[i].text == wordDataArray[j].word) {
        for (let k = i + 1; k < displayedWords.length; k++) {
          if (displayedWords[i].text == displayedWords[k].text) {
            displayedWords[i].connect(
              displayedWords[k].ellipseX,
              displayedWords[k].ellipseY,
              color(0, 0, 0, 70)
            );
          }
          if (
            (displayedWords[i].text == "queer" &&
              displayedWords[k].text == "utopia") ||
            (displayedWords[k].text == "queer" &&
              displayedWords[j].text == "utopia")
          ) {
            displayedWords[i].connect(
              displayedWords[k].ellipseX,
              displayedWords[k].ellipseY,
              color(255, 0, 0, 70)
            );
          }
        }
      }
    }
  }
  for (let i = 0; i < displayedWords.length; i++) {
    displayedWords[i].draw();
  }

  frameRate(20);
  angleMode(DEGREES);
}

function draw() {
  // background(255)
  // push();
  // fill(color(0, 0, 0, 50));
  // text(backgroundText, 0, 0, window.innerWidth, fullTextHeight);
  // pop();
  // for (let i = 0; i < displayedWords.length; i++) {
  //   displayedWords[i].draw();
  //   displayedWords[i].move();
  // }
}

function mousePressed() {
  noLoop();
}

class TextPoint {
  constructor(t, x, y) {
    this.text = t;

    this.fontSize = 20;
    this.tWidth = textWidth(t);

    this.x = x;
    this.y = y;

    this.radius = 10;
    this.offset = 5;

    this.ellipseX = this.x + this.tWidth / 4 + this.radius / 2;
    this.ellipseY = this.y + this.radius / 2 + this.offset;

    this.newEllipseX = this.x;
    this.newEllipseY = this.y;

    this.angle = 0;
  }
  draw() {
    push();

    fill(0);
    translate(this.x, this.y);
    push();
    fill(255);
    strokeWeight(0);
    rect(0, -textLeading() + textDescent(), this.tWidth, textLeading());
    pop();
    textSize(this.fontSize);
    let t = text(this.text, 0, 0);

    push();

    fill(255);
    stroke(0);
    strokeWeight(2);
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
  move(angle) {
    this.x += this.radius * cos(this.angle);
    this.y += this.radius * sin(this.angle);

    // this.ellipseX+= this.radius * cos(this.angle);
    // this.ellipseY += this.radius * sin(this.angle);
    let rand = random(20,30)
    this.angle+=rand;
  }
}
