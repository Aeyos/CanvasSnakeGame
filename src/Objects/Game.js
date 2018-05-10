import Snake from "./Snake";

export default class Game {
  constructor(canvasEl, w, h) {
    console.clear();
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width = w;
    this.canvas.height = this.height = h;

    window.addEventListener("keyup", evt => {
      const fn = this[`on${evt.key}`];
      if (typeof fn === "function") {
        fn.call(this);
      }
    });
  }

  start = () => {
    this.bootUp();
    requestAnimationFrame(this.loop);
  };

  bootUp = () => {
    this.mapBlockSize = 10;
    this.snake = new Snake(this);
    this.mapSize = {
      width: this.width / this.mapBlockSize,
      height: this.height / this.mapBlockSize
    };
    this.lastPerformanceNow = window.performance.now();
  };

  loop = () => {
    this.game();
    this.render();

    requestAnimationFrame(this.loop);
  };

  game = () => {
    const delta = window.performance.now() - this.lastPerformanceNow;
    this.lastPerformanceNow = window.performance.now();

    this.snake.update(delta);
  };

  render = () => {
    const { ctx } = this;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);

    this.snake.render(ctx);
  };

  onArrowUp() {
    this.snake.faceUp();
  }

  onArrowRight() {
    this.snake.faceRight();
  }

  onArrowDown() {
    this.snake.faceDown();
  }

  onArrowLeft() {
    this.snake.faceLeft();
  }
}
