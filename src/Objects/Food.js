export default class Food {
  constructor(game, scene) {
    this.foods = [];
    this.game = game;
    this.scene = scene;
  }

  add = () => {
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * this.game.mapSize.width);
      const y = Math.floor(Math.random() * this.game.mapSize.height);
      if (this.scene.isEmpty(x, y)) {
        return this.foods.push([x, y]);
      }
    }
  };

  remove = (x, y) => {
    this.foods = this.foods.filter(f => f[0] !== x && f[1] !== y);
  };

  isFood = (x, y) => {
    let empty = false;
    this.foods.forEach(s => {
      if (s[0] === x && s[1] === y) {
        empty = true;
      }
    });
    return empty;
  };

  update = delta => {};

  render = ctx => {
    this.foods.forEach(f => {
      const tfp = this.game.mapBlockSize * 0.25;
      ctx.fillStyle = "#D33";
      ctx.fillRect(
        f[0] * this.game.mapBlockSize + tfp,
        f[1] * this.game.mapBlockSize + tfp,
        tfp * 2,
        tfp * 2
      );
    });
  };
}
