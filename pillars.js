class Pillar {
  constructor(x, y, h, w, c) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 50;
    this.c = "#00FFFF";
  }

  GetBottom() {
    return this.y + this.h
  }

  drawPillar() {
    fill(this.c);
    stroke("#FF00FF");
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
    this.x -= 3;
  }

  hit(frog) {
    if (frog.x + frog.w - 20 > this.x && frog.x < this.x + this.w) {
      if (frog.y + frog.h > this.y && frog.y < this.y + this.h) {
        let idx = activeFrogs.indexOf(frog);
        activeFrogs.splice(idx, 1);
        //console.log("hit")
      }
    }
  }
}

