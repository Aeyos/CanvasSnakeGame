import Color from "./Utils/Color";
import Positioning from "./Utils/Positioning";

class Button {
  constructor(game, args) {
    this.game = game;

    this.pos = args.pos || { x: 0, y: 0 };
    this.padding = args.padding || 10;
    this.color = args.color || Color.WHITE;
    this.positioning = args.positioning || Positioning.CC;
    this.width = args.width || 100;
    this.height = args.height || 20;
  }

  events = () => {};

  render = ctx => {
    ctx.fillStyle = this.color;
    const y = this.pos.y - this.positioning[1] * this.height;
    const x = this.pos.x - this.positioning[0] * this.width;
    ctx.fillRect(x, y, this.width, this.height);
  };

  update = () => {};
}

export default Button;
