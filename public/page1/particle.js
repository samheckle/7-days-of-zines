// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

class Particle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(-2, 2));
      this.acc = createVector(0, 0);
      this.r = 1;
      this.lifetime = 200;
      this.offset = .05;
    }
    
    randCheck(r, vec1, vec2){
      if(r > 1) return vec1.add(vec2);
      else if(r > 0) return vec1.sub(vec2);
      // else if(r > 0) return vec1.mult(vec2);
      // else if(r > 0) return vec1.div(vec2);
      
    }
  
    finished() {
      return this.lifetime < 0;
    }
  
    applyForce(force) {
      let randForce = random(0, 2);
      // console.log(randForce, this.pos)
      // if (randForce > 0) {
      //   this.acc.add(force);
      // } else {
      //   this.acc.sub(force);
      // }
      this.acc = this.randCheck(randForce, this.acc, force)
    }
  
    edges() {
      if (this.pos.y >= height - this.r) {
        this.pos.y = height - this.r;
        this.vel.y *= -1;
      }
  
      if (this.pos.x >= width - this.r) {
        this.pos.x = width - this.r;
        this.vel.x *= -1;
      } else if (this.pos.x <= this.r) {
        this.pos.x = this.r;
        this.vel.x *= -1;
      }
    }
  
    update() {
      let randPos = random(0, 2);
      this.pos = this.randCheck(randPos, this.pos, this.vel)
  
      let randAcc = random(0, 2);
      this.vel = this.randCheck(randAcc, this.vel, this.acc)
  
      this.acc.set(0, 0);
  
      this.lifetime -= 5;
    }
  
    show() {
      this.offset += .005
      if(window.innerWidth > 1025){
        stroke(noise(this.offset) * width, this.lifetime);
        strokeWeight(1);
        fill(noise(this.offset) * width);
      } else{
        stroke(255, this.lifetime)
        strokeWeight(1)
        fill(255, this.lifetime)
      }
  
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
  }
  