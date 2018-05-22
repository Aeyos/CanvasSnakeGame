import Font from "../Utils/Font";

export default class Food {
  constructor(game, scene) {
    this.points = 0;
    this.game = game;
    this.scene = scene;
    this.font = new Font({
      size: 20,
      weight: "800"
    });
  }

  add = n => {
    this.points += n;
  };

  render = ctx => {
    this.font.set(ctx);
    ctx.fillStyle = "#333";
    ctx.fillText(this.points, 10, 25);
  };
}
