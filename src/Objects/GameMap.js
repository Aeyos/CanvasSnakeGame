class GameMap {
  constructor(game, scene) {
    this.mapBlockSize = game.mapBlockSize;

    this.game = game;
    this.scene = scene;

    this.x = 15;
    this.y = this.mapBlockSize * 1.5;

    this.mapSize = {
      width: game.width / this.mapBlockSize - 1,
      height: game.height / this.mapBlockSize - 2
    };

    console.log(this.mapSize);
  }

  render = ctx => {
    ctx.save();
    ctx.fillStyle = "#EEE";
    this.scene.drawInMap(ctx);

    for (var i = 1; i < (this.mapSize.width + 1) * this.mapBlockSize; i += this.mapBlockSize) {
      ctx.fillRect(i, 0, 1, this.mapSize.height * this.mapBlockSize);
    }
    for (var i = 1; i < (this.mapSize.height + 1) * this.mapBlockSize; i += this.mapBlockSize) {
      ctx.fillRect(0, i, this.mapSize.width * this.mapBlockSize, 1);
    }
    ctx.restore();

    ctx.fillStyle = "#AAA";

    ctx.fillRect(0, 0, this.game.width, 1);
    ctx.fillRect(0, 0, 1, this.game.height);
    ctx.fillRect(0, this.game.height - 1, this.game.width, 1);
    ctx.fillRect(this.game.width - 1, 0, 1, this.game.height);

  };
}

export default GameMap;
