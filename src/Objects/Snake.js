import DIRECTIONS from "../Constants/directions.js";

export default class Snake {
  constructor(game) {
    this.segments = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];
    this.points = 0;
    this.direction = 1; // 0,1,2,3 - up, right, down, left
    this.game = game;
    this.clockMove = 0;
    this.stepsPerSec = 5;
    this.speed = 1000 / this.stepsPerSec;
  }

  moveUp = () => this.move(this.segments[0][0], this.segments[0][1] - 1);
  moveRight = () => this.move(this.segments[0][0] + 1, this.segments[0][1]);
  moveDown = () => this.move(this.segments[0][0], this.segments[0][1] + 1);
  moveLeft = () => this.move(this.segments[0][0] - 1, this.segments[0][1]);

  move = (x, y) => {
    if (x < 0) {
      x = this.game.mapSize.width;
    } else if (x >= this.game.mapSize.width) {
      x = 0;
    }

    if (y < 0) {
      y = this.game.mapSize.height;
    } else if (y >= this.game.mapSize.height) {
      y = 0;
    }

    this.segments.pop();
    this.segments = [[x, y], ...this.segments];
  };

  eat = (x, y) => {
    this.segments.unshift([x, y]);
  };

  faceUp = () => (this.direction = DIRECTIONS.UP);
  faceRight = () => (this.direction = DIRECTIONS.RIGHT);
  faceDown = () => (this.direction = DIRECTIONS.DOWN);
  faceLeft = () => (this.direction = DIRECTIONS.LEFT);

  update = delta => {
    this.clockMove += delta;
    if (this.clockMove < this.speed) return;
    this.clockMove = 0;
    [this.moveUp, this.moveRight, this.moveDown, this.moveLeft][
      this.direction
    ]();
  };

  render = ctx => {
    this.segments.forEach(s => {
      const tfp = this.game.mapBlockSize * 0.25;
      ctx.fillStyle = "#000";
      ctx.fillRect(
        s[0] * this.game.mapBlockSize + tfp,
        s[1] * this.game.mapBlockSize + tfp,
        tfp * 2,
        tfp * 2
      );
    });
  };
}
