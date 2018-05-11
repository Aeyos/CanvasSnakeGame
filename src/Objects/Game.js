import Background from "./Background";
import Snake from "./Snake";
import Food from "./Food";

export default class Game {
  constructor(canvasEl, w, h) {
    console.clear();
    this.gameEngineInstanceId = `${new Date().getTime()}${Math.floor(
      Math.random() * 1000
    )}`;
    window.currentGameEngineInstanceId = this.gameEngineInstanceId;

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

  destroy = () => {};

  start = () => {
    this.bootUp();
    requestAnimationFrame(this.loop);
  };

  restart = () => {
    this.bootUp();
    this.gameOver = false;
  };

  bootUp = () => {
    this.mapBlockSize = 30;

    this.mapSize = {
      width: this.width / this.mapBlockSize,
      height: this.height / this.mapBlockSize
    };
    this.lastPerformanceNow = window.performance.now();

    this.background = new Background(this);
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.food.add();
  };

  loop = () => {
    if (this.gameEngineInstanceId !== window.currentGameEngineInstanceId) {
      return;
    }

    if (!this.gameOver) {
      this.game();
      this.render();
    } else {
      this.renderGameOver();
    }
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

    this.background.render(ctx);
    this.snake.render(ctx);
    this.food.render(ctx);
  };

  renderGameOver = () => {
    const { ctx } = this;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#000";
    ctx.fillText("Game over", 15, 15);
  };

  onArrowUp = () => {
    this.snake.faceUp();
  };

  onArrowRight = () => {
    this.snake.faceRight();
  };

  onArrowDown = () => {
    this.snake.faceDown();
  };

  onArrowLeft = () => {
    this.snake.faceLeft();
  };

  isEmpty = (x, y) => {
    return !(this.snake.isSnake(x, y) || this.food.isFood(x, y));
  };

  objectAt = (x, y) => {
    if (this.snake.isSnake(x, y)) {
      return "Snake";
    } else if (this.food.isFood(x, y)) {
      return "Food";
    }
    return null;
  };

  setGameOver = state => {
    this.gameOver = state;
  };

  removeFood = (x, y) => {
    this.food.remove(x, y);
    this.food.add();
  };
}
