import Color from "../Utils/Color";
import Positioning from "../Utils/Positioning";

class Button {
  constructor(game, args) {
    this.game = game;

    this.pos = args.pos || { x: 0, y: 0 };
    this.color = args.color || Color.WHITE;
    this.positioning = args.positioning || Positioning.CC;
    this.text = args.text || "";
    this.fontSize = args.fontSize || 25;
  }

  setText = text => {
    this.textSize = null;
    this.text = text;
  };

  measureText = ctx => {
    if (!this.textSize) {
      this.textSize = ctx.measureText(this.text);
      this.width = this.textSize.width;
      this.height = this.fontSize;
    }
  };

  event = () => {};

  render = ctx => {
    ctx.font = `${this.fontSize}px Arial`;
    this.measureText(ctx);

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.pos.x, this.pos.y + this.fontSize / 3);
  };

  update = () => {};
}

export default Button;
