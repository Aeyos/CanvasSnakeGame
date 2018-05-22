export default class Background {
  constructor(game) {
    this.game = game;
    this.mbs = this.game.mapBlockSize;
    this.ms = {
      width: game.width / this.mbs,
      height: game.height / this.mbs,
    }
  }

  update = () => {};

  render = ctx => {

    ctx.fillStyle = "#EEE";

    for (var i = 1; i < this.ms.width * this.mbs; i += this.mbs) {
      ctx.fillRect(i, 0, 1, this.ms.height * this.mbs);
    }
    for (var i = 1; i < this.ms.height * this.mbs; i += this.mbs) {
      ctx.fillRect(0, i, this.ms.width * this.mbs, 1);
    }

    ctx.fillStyle = "#AAA";

    ctx.fillRect(0, 0, this.ms.width * this.mbs, 1);
    ctx.fillRect(0, 0, 1, this.ms.height * this.mbs);
    ctx.fillRect(0, this.ms.height * this.mbs - 1, this.ms.width * this.mbs, 1);
    ctx.fillRect(this.ms.width * this.mbs - 1, 0, 1, this.ms.height * this.mbs);
  };
}
