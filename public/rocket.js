function Rocket(dna) {
  this.pos = createVector(width/2, height);
  //this.pos = createVector(width/2, height/2);
  this.vel = createVector();
  this.acc = createVector();
  this.crashed = false;
  this.completed = false;

  if(dna) this.dna = dna;
  else this.dna = new DNA();

  this.distance = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calculateDistance = function() {
    this.distance = dist(this.pos.x, this.pos.y, target.x, target.y);
  }

  this.update = function() {
    // completed
    if (dist(this.pos.x, this.pos.y, target.x, target.y) < 20) {
      this.completed = true;
    }

    // crashed
    if (this.pos.x > obstacle.x &&
        this.pos.x < obstacle.x + 250 &&
        this.pos.y > obstacle.y &&
        this.pos.y < obstacle.y + 25) {
          this.crashed = true;
    }

    if (this.pos.x > width ||
        this.pos.x < 0 ||
        this.pos.y > height + 50||
        this.pos.y < 0) {
        this.crashed = true;
    }

    if (!this.completed && !this.crashed) {
      this.applyForce(this.dna.genes[counter]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    // slow down if fuel runs out
    if(counter > lifespan) {
      this.vel.mult(0.9);
      this.calculateDistance();
    }
  }

  this.show = function() {
    push(); // start a new drawing state
    // the rocket always points the way it's moving
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()+PI/2);
    this.drawRocket(1);
    pop(); // restore previous state
  }

  // draw the rocket sprite, s is size
  this.drawRocket = function(s) {
    noStroke();
    fill(200, 175);
    rect(0, 0, 4*s, 4*s);
    rect(-s, 4*s, 6*s, 14*s);
    rect(-2*s, 12*s, 1*s, 2*s);
    rect(5*s, 12*s, 1*s, 2*s);
    rect(-4*s, 12*s, 2*s, 8*s);
    rect(6*s, 12*s, 2*s, 8*s);

    fill(51, 175);
    rect(0, 8*s, 4*s, 4*s);

    // flames
    if (counter < lifespan) {
    // black window
    fill(22, 122, 198, 175);
    rect(0, 8*s, 4*s, 4*s);
    // flames
    fill(255, 0, 0, 175);
    rect(0, 18*s, 2*s, 4*s);
    rect(2*s, 18*s, 2*s, 6*s);
    }

    if(this.completed) {
      fill(0, 255, 0, 175);
      //rect(0, 8*s, 4*s, 4*s);
      rect(0, 0, 4*s, 4*s);
      rect(-s, 4*s, 6*s, 14*s);
      rect(-2*s, 12*s, 1*s, 2*s);
      rect(5*s, 12*s, 1*s, 2*s);
      rect(-4*s, 12*s, 2*s, 8*s);
      rect(6*s, 12*s, 2*s, 8*s);
    }
  }
}
