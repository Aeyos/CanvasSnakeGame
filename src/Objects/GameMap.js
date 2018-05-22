class GameMap {
  constructor(game, scene) {
    this.mapBlockSize = game.mapBlockSize;

    this.x = 0;
    this.y = this.mapBlockSize;

    this.mapSize = {
      width: game.width / this.mapBlockSize,
      height: (game.height / this.mapBlockSize) - 1,
    };

    console.log(this.mapSize);
  }
}

export default GameMap;