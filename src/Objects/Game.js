import Background from "./Background";
import Snake from "./Snake";
import Food from "./Food";
import Scenes from "./Scenes";
import Button from "./Button";
import Mouse from "./Utils/Mouse";
import Keyboard from "./Utils/Keyboard";

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

    this.focusHackEl = document.createElement("input");
    this.focusHackEl.style.opacity = 0;
    this.focusHackEl.style.position = "absolute";
    this.focusHackEl.style.top = 0;

    document.body.appendChild(this.focusHackEl);
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
    this.time = window.performance.now();

    this.scenes = new Scenes(this);
    this.background = new Background(this);
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.keyboard = new Keyboard(this);
    this.mouse = new Mouse(this);
    this.food.add();

    this.setupScenes();
  };

  setupScenes = () => {
    const newGameBtn = new Button(this, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: this.width / 2, y: this.height * 0.35 },
      text: "New Game"
    });
    const continueBtn = new Button(this, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: this.width / 2, y: this.height * 0.45 },
      text: "Continue"
    });
    const optionsBtn = new Button(this, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: this.width / 2, y: this.height * 0.6 },
      text: "Options"
    });

    this.scenes.setScene("menu");

    this.scenes.addObject(this.background);
    this.scenes.addObject(newGameBtn);
    this.scenes.addObject(continueBtn);
    this.scenes.addObject(optionsBtn);
  };

  loop = () => {
    if (this.gameEngineInstanceId !== window.currentGameEngineInstanceId) {
      return;
    }

    this.time = window.performance.now();

    this.events();
    this.game();
    this.render();

    requestAnimationFrame(this.loop);
  };

  events = () => {
    this.scenes.eventAll(this.mouse, this.keyboard);
  };

  game = () => {
    const delta = window.performance.now() - this.lastPerformanceNow;
    this.lastPerformanceNow = window.performance.now();

    this.scenes.updateAll(delta);
  };

  render = () => {
    const { ctx } = this;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);

    this.scenes.renderAll(ctx);
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
