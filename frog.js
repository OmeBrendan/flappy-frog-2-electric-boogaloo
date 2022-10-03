class Frog {
  constructor(brain) {
    this.vy = 0;
    this.y = 125;
    this.w = 50;
    this.h = 50;
    this.x = 150;
    this.gravity = 0.30;
    this.hearts = 3;

    this.brain = new NeuralNetwork(4, 4, 1);
  }

  think(pillars) {
    if(pillars.length < 1){
      return;
    }

    let closest;
    let record = Infinity;
    for (let i = 0; i < pillars.length; i++) {
      let diff = pillars[i].x - this.x;      
      if (diff > 0 && diff < record) {        
        record = diff;
        closest = pillars[i];
      }
    }
    
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.y / height;
    inputs[2] = closest.y + closest.h / height;
    inputs[3] = closest.x / width;

    // inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
    // console.log(output)
    if (output > 0.5) {
      this.vy = -5;      
    }
  }

  draw() {
    image(fr, this.x, this.y, this.w, this.h);

    if (this.y == 350) {
      this.y = 350
    }

    this.move();
  }

  move() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.y = constrain(this.y, 0, 350);
  }
}
