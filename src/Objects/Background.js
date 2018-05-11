export default class Background {
  constructor(game) {
    this.game = game;
  }

  render = ctx => {
    const mbs = this.game.mapBlockSize;
    const ms = this.game.mapSize;

    ctx.fillStyle = "#AAA";

    for (var i = 0; i < ms.width * mbs; i += mbs) {
      ctx.fillRect(i, 0, 1, ms.height * mbs);
    }
    for (var i = 0; i < ms.height * mbs; i += mbs) {
      ctx.fillRect(0, i, ms.width * mbs, 1);
    }
    ctx.fillRect(0, ms.height * mbs - 1, ms.width * mbs, 1);
    ctx.fillRect(ms.with * mbs - 1, 0, 1, ms.height * mbs);
  };
}
