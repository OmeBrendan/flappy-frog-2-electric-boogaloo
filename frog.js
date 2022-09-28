class Frog {
  constructor(vy, y, w, h, x, gravity, hearts) {
    this.vy = vy;
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
    
    let inputs = [];
    inputs[0] = this.y / h;
    inputs[1] = pillars[0].y / h;
    inputs[2] = pillars[0].y + pillars[0].h / h;
    inputs[3] = pillars[0].x / w;

    // inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
    // console.log(output)
    if (output > 0.5) {
      frog.vy = -5;
      jump.play();
    }
  }

  draw() {
    image(fr, this.x, this.y, this.w, this.h);

    if (this.y == 350) {
      gameState = 2;
    }
  }

  move() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.y = constrain(this.y, 0, 350);
  }
}
