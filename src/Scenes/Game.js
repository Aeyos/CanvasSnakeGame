import Background from "../UI/Background";
import Snake from "../Objects/Snake";
import Food from "../Objects/Food";
import Points from "../Objects/Points";
import GameMap from "../Objects/GameMap";

class Game {
  constructor(game) {
    this.background = new Background(game);
    this.snake = new Snake(game, this);
    this.food = new Food(game, this);
    this.points = new Points(game, this);
    this.map = new GameMap(game, this);

    this.food.add();

    this.objects = {
      0: [this.background, this.map],
      1: [this.food],
      2: [this.snake],
      3: [this.points]
    };
  }

  isEmpty = (x, y) => {
    return !(this.snake.isSnake(x, y) || this.food.isFood(x, y));
  };

  objectAt = (x, y) => {
    if (this.snake.isSnake(x, y)) {
      return "Snake";
    } else if (this.food.isFood(x, y)) {
      return "Food";
    }
    return null;
  };

  removeFood = (x, y) => {
    this.food.remove(x, y);
    this.points.add(1);
    this.food.add();
  };

  getMapSize = () => {
    return this.map.mapSize;
  }

  drawInMap = ctx => {
    ctx.translate(this.map.x, this.map.y);
  }
}

export default Game;
