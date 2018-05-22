import Scenes from "./Scenes";
import Mouse from "../Utils/Mouse";
import Keyboard from "../Utils/Keyboard";

import MenuScene from "../Scenes/Menu";
import GameScene from "../Scenes/Game";
import LoseScene from "../Scenes/Lose";

export default class GameEngine {
  constructor(canvasEl, w, h) {
    console.clear();
    console.log(this);

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

  start = () => {
    this.bootUp();
    requestAnimationFrame(this.loop);
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

    this.keyboard = new Keyboard(this);
    this.mouse = new Mouse(this);

    this.setupScenes();
  };

  setupScenes = () => {
    this.scenes.loadScene("menu", new MenuScene(this));
    this.scenes.setScene("menu");

    this.scenes.loadScene("lose", new LoseScene(this));
  };

  // LifeCycle
  loop = () => {
    if (this.gameEngineInstanceId !== window.currentGameEngineInstanceId) {
      return;
    }

    this.time = window.performance.now();

    this.events();
    this.update();
    this.render();

    requestAnimationFrame(this.loop);
  };

  events = () => {
    this.scenes.eventAll(this.mouse, this.keyboard);
    this.mouse.afterHandle();
  };

  update = () => {
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

  // Win/lose
  startGame = () => {
    this.scenes.loadScene("game", new GameScene(this));
    this.scenes.setScene("game");
  };

  gameOver = () => {
    this.scenes.setScene("lose");
  };
}
