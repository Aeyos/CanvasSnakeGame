import DIRECTIONS from "../Constants/directions.js";

export default class Snake {
  constructor(game, scene) {
    this.segments = [[0, 0], [0, 1], [0, 2]];
    this.points = 0;
    this.direction = 1; // 0,1,2,3 - up, right, down, left
    this.game = game;
    this.scene = scene;
    this.clockMove = 0;
    this.stepsPerSec = 9;
    this.speed = 1000 / this.stepsPerSec;
    this.directionBuffer = null;
  }

  moveUp = () => this.move(this.segments[0][0], this.segments[0][1] - 1);
  moveRight = () => this.move(this.segments[0][0] + 1, this.segments[0][1]);
  moveDown = () => this.move(this.segments[0][0], this.segments[0][1] + 1);
  moveLeft = () => this.move(this.segments[0][0] - 1, this.segments[0][1]);

  move = (x, y) => {
    let ox = x;
    let oy = y;
    const ms = this.scene.getMapSize();

    if (x < 0) {
      ox = ms.width - 1;
    } else if (x >= ms.width) {
      ox = 0;
    }

    if (y < 0) {
      oy = ms.height - 1;
    } else if (y >= ms.height) {
      oy = 0;
    }

    const o = this.scene.objectAt(ox, oy);

    if (o === "Food") {
      this.eat(ox, oy);
    } else if (o === "Snake") {
      this.game.gameOver();
    } else {
      this.slither(ox, oy);
    }
  };

  eat = (x, y) => {
    this.segments.unshift([x, y]);
    this.scene.removeFood(x, y);
  };

  slither = (x, y) => {
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

  event = (mouse, keyboard) => {
    if (keyboard.keyDown("ArrowUp")) {
      this.faceUp();
    }

    if (keyboard.keyDown("ArrowRight")) {
      this.faceRight();
    }

    if (keyboard.keyDown("ArrowDown")) {
      this.faceDown();
    }

    if (keyboard.keyDown("ArrowLeft")) {
      this.faceLeft();
    }
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
    ctx.save();
    ctx.fillStyle = "#000";
    this.scene.drawInMap(ctx);

    this.segments.forEach(s => {
      const tfp = this.game.mapBlockSize * 0.25;
      ctx.fillRect(
        s[0] * this.game.mapBlockSize + tfp,
        s[1] * this.game.mapBlockSize + tfp,
        tfp * 2,
        tfp * 2
      );
    });
    ctx.restore();
  };
}
