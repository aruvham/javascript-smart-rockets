// x and y are target coordinates
function Population() {
  this.rockets = [];
  this.popsize = 50;
  this.matingPool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    this.rockets.forEach(function(rocket){
      rocket.update();
      rocket.show();
    });
  }

  // calculate fitness and create mating pool
  this.evaluate = function() {
    // get the distance between each rocket and the target
    // store them in an array
    var distances = [];
    this.rockets.forEach(function(rocket){
      distances.push(rocket.distance);
    });
    // find the max and min distances
    var max = Math.max.apply(null, distances);
    var min = Math.min.apply(null, distances);

    // loop through each distance
    for (var i = 0; i < distances.length; i++) {
      // map between 100 and 0
      distances[i] = map(distances[i], min, max, 1, 0);
      distances[i] = distances[i]*distances[i]*distances[i]*distances[i]*100;
      distances[i] = Math.floor(distances[i]);
      if (this.rockets[i].completed) distances[i] *= 4;
      if (this.rockets[i].crashed) distances[i] *= 0.05;
      // create mating pool, low distance means high probability
      // of picking a particular rocket from mating pool
      for (var j = 0; j < distances[i]; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    // two random parents from mating pool
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingPool).dna;
      var parentB = random(this.matingPool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
}
