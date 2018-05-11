import DIRECTIONS from "../Constants/directions.js";

export default class Snake {
  constructor(game) {
    this.segments = [
      [0, 0],
      [0, 1],
      [0, 2]
    ];
    this.points = 0;
    this.direction = 1; // 0,1,2,3 - up, right, down, left
    this.game = game;
    this.clockMove = 0;
    this.stepsPerSec = 10;
    this.speed = 1000 / this.stepsPerSec;
    this.directionBuffer = null;
  }

  moveUp = () => this.move(this.segments[0][0], this.segments[0][1] - 1);
  moveRight = () => this.move(this.segments[0][0] + 1, this.segments[0][1]);
  moveDown = () => this.move(this.segments[0][0], this.segments[0][1] + 1);
  moveLeft = () => this.move(this.segments[0][0] - 1, this.segments[0][1]);

  move = (x, y) => {
    const o = this.game.objectAt(x, y);

    if (o === "Food") {
      this.eat(x, y);
    } else if (o === "Snake") {
      this.game.setGameOver(true);
    } else {
      this.slither(x, y);
    }
  };

  eat = (x, y) => {
    this.segments.unshift([x, y]);
    this.game.removeFood(x, y);

  };

  slither = (x, y) => {
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

  faceUp = () => {
    if (this.directionBuffer) return;
    if (this.direction !== DIRECTIONS.DOWN) {
      this.directionBuffer = DIRECTIONS.UP;
    }
  };
  faceRight = () => {
    if (this.directionBuffer) return;
    if (this.direction !== DIRECTIONS.LEFT) {
      this.directionBuffer = DIRECTIONS.RIGHT;
    }
  };
  faceDown = () => {
    if (this.directionBuffer) return;
    if (this.direction !== DIRECTIONS.UP) {
      this.directionBuffer = DIRECTIONS.DOWN;
    }
  };
  faceLeft = () => {
    if (this.directionBuffer) return;
    if (this.direction !== DIRECTIONS.RIGHT) {
      this.directionBuffer = DIRECTIONS.LEFT;
    }
  };

  isSnake = (x, y) => {
    let snake = false;
    this.segments.forEach(s => {
      if (s[0] === x && s[1] === y) {
        snake = true;
      }
    });
    return snake;
  };

  update = delta => {
    this.clockMove += delta;
    if (this.clockMove < this.speed) return;
    this.clockMove = 0;

    if (this.directionBuffer !== null) {
      this.direction = this.directionBuffer;
      this.directionBuffer = null;
    }

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
