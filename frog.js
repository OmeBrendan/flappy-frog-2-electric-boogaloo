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

  think() {

    let inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
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
