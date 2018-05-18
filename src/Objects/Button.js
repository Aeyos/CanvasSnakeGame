import Color from "./Utils/Color";
import Positioning from "./Utils/Positioning";

class Button {
  constructor(game, args) {
    this.game = game;

    this.pos = args.pos || { x: 0, y: 0 };
    this.padding = args.padding || [10, 20];
    this.bgColor = args.bgColor || Color.WHITE;
    this.fgColor = args.fgColor || Color.WHITE;
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
      this.width = this.textSize.width + 2 * this.padding[1];
      this.height = this.fontSize + 2 * this.padding[0];
    }
  };

  event = (mouse, keyboard) => {
    if (keyboard.keyDown("ArrowUp")) {
      console.log("oh ye");
    }
  };

  render = ctx => {
    ctx.font = `${this.fontSize}px Arial`;
    this.measureText(ctx);

    ctx.fillStyle = this.bgColor;
    const y = this.pos.y - this.positioning[1] * this.height;
    const x = this.pos.x - this.positioning[0] * this.width;
    ctx.fillRect(x, y, this.width, this.height);

    ctx.fillStyle = this.fgColor;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.pos.x, this.pos.y + this.fontSize / 3);
  };

  update = () => {};
}

export default Button;
