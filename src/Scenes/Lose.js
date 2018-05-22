import Background from "../UI/Background";
import Button from "../UI/Button";
import Text from "../UI/Text";

class Menu {
  constructor(game) {
    this.background = new Background(game);
    this.gameOverText = new Text(game, {
      fontSize: 50,
      pos: { x: game.width / 2, y: game.height * 0.4 },
      text: "Game Over",
      color: "#333"
    });
    this.restartBtn = new Button(game, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: game.width / 2, y: game.height * 0.6 },
      text: "Restart",
      onAction: () => {
        game.startGame();
      }
    });
    this.menuBtn = new Button(game, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: game.width / 2, y: game.height * 0.7 },
      text: "Menu",
      onAction: () => {
        game.scenes.setScene("menu");
      }
    });

    this.objects = {
      0: [this.background],
      1: [this.gameOverText, this.restartBtn, this.menuBtn]
    };
  }
}

export default Menu;

// this.scenes.addObject(this.background, 2, "lose");
// this.scenes.addObject(gameOverText, 0, "lose");
// this.scenes.addObject(restartBtn, 0, "lose");
// this.scenes.addObject(menuBtn, 0, "lose");
