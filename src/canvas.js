import React from "react";
import Game from "./Core/Game";

class Canvas extends React.Component {
  componentDidMount() {
    this.game = new Game(this.canvasEl, 600, 600);
    this.game.start();
  }

  restart = () => {
    this.game.restart();
  };

  render() {
    return (
      <div>
        <canvas ref={e => (this.canvasEl = e)} />
        <button
          onClick={() => {
            this.game.gameOver();
          }}
        >
          LOSE
        </button>
      </div>
    );
  }
}

export default Canvas;
