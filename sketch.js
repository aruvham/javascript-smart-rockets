// Smart Rockets
// Arturo Ruvalcaba Ham
// Nov 14 2016

// To Do:
//  - Make a target object

var population;
var counter = 0;
var lifespan = 300;
var target;
var obstacle;

function setup() {
  createCanvas(500, 500);
  target = createVector(width/2, height/4);
  obstacle = createVector(width/2, height/2);
  population = new Population();
  //rocket = new Rocket();
}

function draw() {
  background(51);
  drawTarget(2);
  drawObstacle(width/2, 25);
  //rocket.show();
  population.run();
  counter++;

  // end of generation
  if (counter > lifespan + 50) {
    // evaluate current gen
    population.evaluate();
    // create a next gen
    population.selection();
    counter = 0;
  }
}

function drawTarget(s) {
    noStroke();
    fill(255);
    ellipse(target.x, target.y, 20*s, 20*s);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 16*s, 16*s);
    fill(255);
    ellipse(target.x, target.y, 12*s, 12*s);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 8*s, 8*s);
    fill(255);
    ellipse(target.x, target.y, 4*s, 4*s);
}

function drawObstacle(w, h) {
  noStroke();
  fill(255);
  rect(obstacle.x, obstacle.y, w, h);
}
