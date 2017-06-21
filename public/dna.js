function DNA(genes) {

  this.mutationRate = 0.01;

  if(genes) this.genes = genes;
  else {
    // populate genes array with random vectors
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }

  this.crossover = function(partner) {
    var newdna = [];
    // pick a random mid point
    var mid = Math.floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      newdna[i] = i > mid ? this.genes[i] : partner.genes[i];
    }
    return new DNA(newdna);
  }

  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if(random(1) < this.mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
      }
    }
  }
}
