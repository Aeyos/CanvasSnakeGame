import Font from "../Utils/Font";

export default class Food {
  constructor(game, scene) {
    this.time = 0;
    this.game = game;
    this.scene = scene;
    this.font = new Font({
      size: 20,
      weight: "800",
      align: "center"
    });
  }

  update = delta => {
    this.time += delta;
    this.formattedTime = (Math.round(this.time / 100) / 10).toFixed(1);
  };

  render = ctx => {
    this.font.set(ctx);
    ctx.fillStyle = "#333";
    ctx.fillText(`Time: ${this.formattedTime}`, this.game.width / 2, 30);
  };
}
