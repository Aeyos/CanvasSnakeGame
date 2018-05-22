import Background from "../UI/Background";
import Button from "../UI/Button";

class Menu {
  constructor(game) {
    this.background = new Background(game);
    this.newGameBtn = new Button(game, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: game.width / 2, y: game.height * 0.35 },
      text: "New Game",
      onAction: () => {
        game.startGame();
      }
    });
    this.continueBtn = new Button(game, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: game.width / 2, y: game.height * 0.45 },
      text: "Continue"
    });
    this.optionsBtn = new Button(game, {
      bgColor: "#333",
      fgColor: "#FFF",
      pos: { x: game.width / 2, y: game.height * 0.6 },
      text: "Options"
    });

    this.objects = {
      0: [this.background],
      1: [this.newGameBtn, this.continueBtn, this.optionsBtn]
    };
  }
}

export default Menu;
